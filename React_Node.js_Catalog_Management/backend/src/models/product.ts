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
