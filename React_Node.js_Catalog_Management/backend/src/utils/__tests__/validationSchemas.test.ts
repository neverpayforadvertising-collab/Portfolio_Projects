// CHANGED: new file — backend previously had zero test files, so
// `jest --runInBand` (and therefore CI `npm test`) failed with "no tests found".
import {
  productCreateSchema,
  bulkUpdateSchema,
  pricingOverrideSchema,
  inventoryUpdateSchema
} from '../validationSchemas';

describe('validationSchemas', () => {
  it('accepts a valid product payload', () => {
    const { error } = productCreateSchema.validate({
      sku: 'SKU-1',
      name: 'Widget',
      description: '',
      category: 'Hardware',
      price: 9.99,
      regions: ['North America'],
      stock: 10,
      status: 'active'
    });
    expect(error).toBeUndefined();
  });

  it('rejects a product with no regions or non-positive price', () => {
    const { error } = productCreateSchema.validate({
      sku: 'SKU-1',
      name: 'Widget',
      category: 'Hardware',
      price: 0,
      regions: [],
      stock: 10,
      status: 'active'
    });
    expect(error).toBeDefined();
  });

  it('requires at least one id and a valid update for bulk updates', () => {
    expect(bulkUpdateSchema.validate({ ids: [], update: { price: 5 } }).error).toBeDefined();
    expect(bulkUpdateSchema.validate({ ids: [1, 2], update: { price: 5 } }).error).toBeUndefined();
  });

  it('validates pricing override adjustment types', () => {
    expect(
      pricingOverrideSchema.validate({
        sku: 'SKU-1',
        region: 'EU',
        adjustmentType: 'percent',
        adjustmentValue: -10,
        reason: 'Promo'
      }).error
    ).toBeUndefined();
    expect(
      pricingOverrideSchema.validate({
        sku: 'SKU-1',
        region: 'EU',
        adjustmentType: 'multiplier',
        adjustmentValue: 2,
        reason: 'Promo'
      }).error
    ).toBeDefined();
  });

  it('rejects negative inventory quantities', () => {
    expect(
      inventoryUpdateSchema.validate({ sku: 'SKU-1', region: 'EU', quantity: -5 }).error
    ).toBeDefined();
  });
});
