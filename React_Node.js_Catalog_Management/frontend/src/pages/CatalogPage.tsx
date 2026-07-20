import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, saveProduct, scheduleBulkUpdate } from '../api/catalog';
import { DataTable } from '../components/DataTable';
import { FilterPanel } from '../components/FilterPanel';
import { ProductForm } from '../components/ProductForm';

const initialFilters = { term: '', region: '', status: '' };

function CatalogPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selected, setSelected] = useState<number[]>([]);
  const [bulkPrice, setBulkPrice] = useState('');
  const queryClient = useQueryClient();

  // CHANGED: migrated to TanStack Query v5 object API. The installed package is
  // v5, but the previous code used the removed v4 positional signature
  // useQuery(['products', filters], fn), which throws at runtime under v5.
  const { data = [], isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters)
  });

  // CHANGED: v5 mutation API — mutationFn option + object form of invalidateQueries.
  const saveMutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  // CHANGED: v5 mutation API (was useMutation(scheduleBulkUpdate, {...})).
  const bulkMutation = useMutation({
    mutationFn: scheduleBulkUpdate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
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
              data={data as unknown as Record<string, unknown>[]}
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
