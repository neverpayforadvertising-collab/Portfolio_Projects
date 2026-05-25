import { poolConnect, pool, sqlTypes } from './db.js';
import { PricingRule } from '../models/pricingRule.js';

export const getPricingRules = async (filters: Record<string, string | undefined>): Promise<PricingRule[]> => {
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
    SELECT id, sku, region, adjustmentType, adjustmentValue, reason, createdAt
    FROM pricing_rules
    ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
    ORDER BY createdAt DESC;
  `);

  return result.recordset.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString()
  }));
};

export const overridePricingRule = async (rule: Omit<PricingRule, 'id' | 'createdAt'>): Promise<number> => {
  await poolConnect;
  const request = pool.request();
  request.input('sku', sqlTypes.NVarChar, rule.sku);
  request.input('region', sqlTypes.NVarChar, rule.region);
  request.input('adjustmentType', sqlTypes.NVarChar, rule.adjustmentType);
  request.input('adjustmentValue', sqlTypes.Decimal(18, 4), rule.adjustmentValue);
  request.input('reason', sqlTypes.NVarChar, rule.reason);

  const result = await request.query(`
    INSERT INTO pricing_rules (sku, region, adjustmentType, adjustmentValue, reason, createdAt)
    VALUES (@sku, @region, @adjustmentType, @adjustmentValue, @reason, SYSUTCDATETIME());
    SELECT SCOPE_IDENTITY() AS id;
  `);

  return Number(result.recordset[0]?.id ?? 0);
};
