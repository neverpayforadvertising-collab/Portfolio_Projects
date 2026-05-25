import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, saveProduct, scheduleBulkUpdate } from '../api/catalog';
import { DataTable } from '../components/DataTable';
import { FilterPanel } from '../components/FilterPanel';
import { ProductForm } from '../components/ProductForm';
import type { Product } from '../types';

const initialFilters = { term: '', region: '', status: '' };

function CatalogPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selected, setSelected] = useState<number[]>([]);
  const [bulkPrice, setBulkPrice] = useState('');
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery(['products', filters], () => fetchProducts(filters));

  const saveMutation = useMutation(saveProduct, {
    onSuccess: () => queryClient.invalidateQueries(['products'])
  });

  const bulkMutation = useMutation(scheduleBulkUpdate, {
    onSuccess: () => queryClient.invalidateQueries(['products'])
  });

  const toggleSelection = (id: number) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const columns = useMemo(
    () => [
      { label: 'SKU', key: 'sku' },
      { label: 'Name', key: 'name' },
      { label: 'Category', key: 'category' },
      { label: 'Price', key: 'price' },
      { label: 'Regions', key: 'regions' },
      { label: 'Stock', key: 'stock' },
      { label: 'Status', key: 'status' }
    ],
    []
  );

  return (
    <div className="page-grid">
      <section className="card">
        <h2>Catalog search and workflows</h2>
        <FilterPanel filters={filters} onChange={(name, value) => setFilters((prev) => ({ ...prev, [name]: value }))} />
        <div className="table-panel">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <DataTable
              columns={columns}
              data={data as Record<string, unknown>[]}
              onRowClick={(row) => toggleSelection(Number(row.id))}
              selectedRowIds={new Set(selected)}
            />
          )}
        </div>
        <div className="bulk-panel">
          <label>
            Bulk selected ids (comma-separated)
            <input value={selected.join(',')} readOnly placeholder="Click row ids to select" />
          </label>
          <label>
            New price
            <input type="number" value={bulkPrice} onChange={(event) => setBulkPrice(event.target.value)} />
          </label>
          <button
            className="primary-button"
            onClick={() => {
              const ids = selected.filter(Boolean);
              bulkMutation.mutate({ ids, update: { price: bulkPrice ? Number(bulkPrice) : undefined } });
            }}
            disabled={!selected.length || !bulkPrice}
          >
            Schedule bulk price update
          </button>
        </div>
      </section>
      <ProductForm onSubmit={(payload) => saveMutation.mutate(payload)} />
    </div>
  );
}

export default CatalogPage;
