import { ChangeEvent, FormEvent, useState } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  product?: Partial<Product>;
  onSubmit: (payload: Omit<Product, 'id' | 'updatedAt'>) => void;
}

type ProductFormState = Omit<Product, 'id' | 'updatedAt'> & { regionsText: string };

const emptyState: ProductFormState = {
  sku: '',
  name: '',
  description: '',
  category: '',
  price: 0,
  regionsText: '',
  regions: [],
  stock: 0,
  status: 'active'
};

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>({
    sku: product?.sku ?? '',
    name: product?.name ?? '',
    description: product?.description ?? '',
    category: product?.category ?? '',
    price: product?.price ?? 0,
    regionsText: product?.regions?.join(', ') ?? '',
    regions: product?.regions ?? [],
    stock: product?.stock ?? 0,
    status: product?.status ?? 'active'
  });

  const handleChange = (key: keyof ProductFormState, value: string | number) => {
    setForm((current) => ({ ...current, [key]: value } as ProductFormState));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Omit<Product, 'id' | 'updatedAt'> = {
      sku: form.sku,
      name: form.name,
      description: form.description,
      category: form.category,
      price: form.price,
      regions: form.regionsText.split(',').map((region) => region.trim()).filter(Boolean),
      stock: form.stock,
      status: form.status
    };

    onSubmit(payload);
    setForm(emptyState);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Product workflow</h2>
      <div className="field-grid">
        <label>
          SKU
          <input value={form.sku} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('sku', event.target.value)} required />
        </label>
        <label>
          Name
          <input value={form.name} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('name', event.target.value)} required />
        </label>
        <label>
          Category
          <input value={form.category} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('category', event.target.value)} required />
        </label>
        <label>
          Regions
          <input
            value={form.regionsText}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('regionsText', event.target.value)}
            placeholder="North America, EU"
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={form.price}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('price', Number(event.target.value))}
            min="0"
            step="0.01"
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            value={form.stock}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange('stock', Number(event.target.value))}
            min="0"
            required
          />
        </label>
        <label>
          Status
          <select value={form.status} onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange('status', event.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>
      <label className="full-width">
        Description
        <textarea value={form.description} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleChange('description', event.target.value)} />
      </label>
      <button className="primary-button" type="submit">Save product</button>
    </form>
  );
}
