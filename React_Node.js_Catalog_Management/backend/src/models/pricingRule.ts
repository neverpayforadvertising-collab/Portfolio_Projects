export interface PricingRule {
  id: number;
  sku: string;
  region: string;
  adjustmentType: 'absolute' | 'percent';
  adjustmentValue: number;
  reason: string;
  createdAt: string;
}
