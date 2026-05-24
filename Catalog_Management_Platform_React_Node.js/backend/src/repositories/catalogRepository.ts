import { poolConnect, pool, sqlTypes } from './db.js';
import { Product } from '../models/product.js';

const createSearchQuery = (filters: Record<string, string | undefined>) => {
  const clauses: string[] = [];
  if (filters.term) {
    clauses.push("(sku LIKE @term OR name LIKE @term OR category LIKE @term)");
  }
  if (filters.category) {
    clauses.push('category = @category');
  }
  if (filters.region) {
    clauses.push("CHARINDEX(',' + @region + ',', ',' + regions + ',') > 0");
  }
  if (filters.status) {
    clauses.push('status = @status');
  }
  const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return whereClause;
};

export const searchProducts = async (filters: Record<string, string | undefined>): Promise<Product[]> => {
  await poolConnect;
  const request = pool.request();

  if (filters.term) {
    request.input('term', sqlTypes.NVarChar, `%${filters.term}%`);
  }
  if (filters.category) {
    request.input('category', sqlTypes.NVarChar, filters.category);
  }
  if (filters.region) {
    request.input('region', sqlTypes.NVarChar, filters.region);
  }
  if (filters.status) {
    request.input('status', sqlTypes.NVarChar, filters.status);
  }

  const result = await request.query(`
    SELECT id, sku, name, description, category, price, regions, stock, status, updatedAt
    FROM products
    ${createSearchQuery(filters)}
    ORDER BY updatedAt DESC;
  `);

  return result.recordset.map((row) => ({
    ...row,
    regions: row.regions ? row.regions.split(',') : [],
    updatedAt: row.updatedAt.toISOString()
  }));
};

export const getProductById = async (id: number): Promise<Product | null> => {
  await poolConnect;
  const result = await pool.request().input('id', sqlTypes.Int, id).query(
    `SELECT id, sku, name, description, category, price, regions, stock, status, updatedAt
     FROM products WHERE id = @id;`
  );
  if (!result.recordset.length) {
    return null;
  }
  const row = result.recordset[0];
  return { ...row, regions: row.regions.split(','), updatedAt: row.updatedAt.toISOString() };
};

export const upsertProduct = async (product: Omit<Product, 'id' | 'updatedAt'>): Promise<number> => {
  await poolConnect;
  const request = pool.request();
  request.input('sku', sqlTypes.NVarChar, product.sku);
  request.input('name', sqlTypes.NVarChar, product.name);
  request.input('description', sqlTypes.NVarChar, product.description);
  request.input('category', sqlTypes.NVarChar, product.category);
  request.input('price', sqlTypes.Decimal(18, 4), product.price);
  request.input('regions', sqlTypes.NVarChar, product.regions.join(','));
  request.input('stock', sqlTypes.Int, product.stock);
  request.input('status', sqlTypes.NVarChar, product.status);

  const result = await request.query(
    `MERGE products AS target
     USING (SELECT @sku AS sku) AS source
     ON target.sku = source.sku
     WHEN MATCHED THEN
       UPDATE SET name = @name, description = @description, category = @category, price = @price, regions = @regions, stock = @stock, status = @status, updatedAt = SYSUTCDATETIME()
     WHEN NOT MATCHED THEN
       INSERT (sku, name, description, category, price, regions, stock, status, updatedAt)
       VALUES (@sku, @name, @description, @category, @price, @regions, @stock, @status, SYSUTCDATETIME())
     OUTPUT inserted.id;
    `
  );

  return result.recordset[0]?.id;
};

export const bulkUpdateProducts = async (
  ids: number[],
  update: Partial<Pick<Product, 'price' | 'status' | 'stock'>>
): Promise<number> => {
  await poolConnect;
  const request = pool.request();
  const setParts: string[] = [];

  if (update.price !== undefined) {
    request.input('price', sqlTypes.Decimal(18, 4), update.price);
    setParts.push('price = @price');
  }
  if (update.status) {
    request.input('status', sqlTypes.NVarChar, update.status);
    setParts.push('status = @status');
  }
  if (update.stock !== undefined) {
    request.input('stock', sqlTypes.Int, update.stock);
    setParts.push('stock = @stock');
  }

  if (!setParts.length) {
    return 0;
  }

  request.input('ids', sqlTypes.VarChar, ids.join(','));
  const result = await request.query(
    `UPDATE products
     SET ${setParts.join(', ')}, updatedAt = SYSUTCDATETIME()
     WHERE id IN (SELECT value FROM STRING_SPLIT(@ids, ','));`
  );

  return result.rowsAffected[0] ?? 0;
};
