import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchInventory, updateInventory } from '../api/inventory';
import { DataTable } from '../components/DataTable';

function InventoryPage() {
  const [filters, setFilters] = useState({ sku: '', region: '' });
  const [updateForm, setUpdateForm] = useState({ sku: '', region: '', quantity: 0, reason: '' });
  const { data = [], isLoading, refetch } = useQuery(['inventory', filters], () => fetchInventory(filters));
  const mutation = useMutation(updateInventory, {
    onSuccess: () => refetch()
  });

  const columns = [{ label: 'SKU', key: 'sku' }, { label: 'Region', key: 'region' }, { label: 'Quantity', key: 'quantity' }, { label: 'Updated', key: 'lastUpdated' }];

  return (
    <div className="page-grid">
      <section className="card">
        <h2>Inventory status</h2>
        <div className="filter-panel">
          <label>
            SKU
            <input value={filters.sku} onChange={(event) => setFilters((prev) => ({ ...prev, sku: event.target.value }))} />
          </label>
          <label>
            Region
            <input value={filters.region} onChange={(event) => setFilters((prev) => ({ ...prev, region: event.target.value }))} />
          </label>
          <button className="secondary-button" onClick={() => refetch()}>
            Refresh inventory
          </button>
        </div>
        <div className="table-panel">
          {isLoading ? <p>Loading inventory...</p> : <DataTable columns={columns} data={data as Record<string, unknown>[]} />}
        </div>
      </section>
      <section className="card form-card">
        <h2>Inventory update</h2>
        <label>
          SKU
          <input value={updateForm.sku} onChange={(event) => setUpdateForm({ ...updateForm, sku: event.target.value })} />
        </label>
        <label>
          Region
          <input value={updateForm.region} onChange={(event) => setUpdateForm({ ...updateForm, region: event.target.value })} />
        </label>
        <label>
          Quantity
          <input type="number" value={updateForm.quantity} onChange={(event) => setUpdateForm({ ...updateForm, quantity: Number(event.target.value) })} />
        </label>
        <label>
          Reason
          <input value={updateForm.reason} onChange={(event) => setUpdateForm({ ...updateForm, reason: event.target.value })} />
        </label>
        <button className="primary-button" onClick={() => mutation.mutate(updateForm)}>
          Update inventory
        </button>
      </section>
    </div>
  );
}

export default InventoryPage;
