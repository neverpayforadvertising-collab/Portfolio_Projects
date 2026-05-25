import { poolConnect, pool, sqlTypes } from './db.js';
import { InventoryRecord } from '../models/inventory.js';

export const getInventoryRecords = async (filters: Record<string, string | undefined>): Promise<InventoryRecord[]> => {
  await poolConnect;
  const request = pool.request();
  const clauses: string[] = [];

  if (filters.sku) {
    request.input('sku', sqlTypes.NVarChar, filters.sku);
    clauses.push('sku = @sku');
  }
  if (filters.region) {
    request.input('region', sqlTypes.NVarChar, filters.region);
    clauses.push('region = @region');
  }

  const result = await request.query(`
    SELECT id, sku, region, quantity, lastUpdated
    FROM inventory
    ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
    ORDER BY lastUpdated DESC;
  `);

  return result.recordset.map((row) => ({
    ...row,
    lastUpdated: row.lastUpdated.toISOString()
  }));
};

export const updateInventory = async (record: Omit<InventoryRecord, 'id' | 'lastUpdated'>): Promise<number> => {
  await poolConnect;
  const request = pool.request();
  request.input('sku', sqlTypes.NVarChar, record.sku);
  request.input('region', sqlTypes.NVarChar, record.region);
  request.input('quantity', sqlTypes.Int, record.quantity);

  const result = await request.query(`
    MERGE inventory AS target
    USING (SELECT @sku AS sku, @region AS region) AS source
    ON target.sku = source.sku AND target.region = source.region
    WHEN MATCHED THEN
      UPDATE SET quantity = @quantity, lastUpdated = SYSUTCDATETIME()
    WHEN NOT MATCHED THEN
      INSERT (sku, region, quantity, lastUpdated)
      VALUES (@sku, @region, @quantity, SYSUTCDATETIME());
    SELECT SCOPE_IDENTITY() AS id;
  `);

  return Number(result.recordset[0]?.id ?? 0);
};
