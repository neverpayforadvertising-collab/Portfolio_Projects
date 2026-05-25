export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  regions: string[];
  stock: number;
  status: 'active' | 'inactive';
  updatedAt: string;
}

export interface PricingRule {
  id: number;
  sku: string;
  region: string;
  adjustmentType: 'absolute' | 'percent';
  adjustmentValue: number;
  reason: string;
  createdAt: string;
}

export interface InventoryRecord {
  id: number;
  sku: string;
  region: string;
  quantity: number;
  lastUpdated: string;
}
