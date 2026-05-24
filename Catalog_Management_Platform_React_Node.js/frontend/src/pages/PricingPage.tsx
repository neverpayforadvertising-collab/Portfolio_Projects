import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPricingRules, overridePricing } from '../api/pricing';
import { DataTable } from '../components/DataTable';

function PricingPage() {
  const [filters, setFilters] = useState({ sku: '', region: '' });
  const [overrideForm, setOverrideForm] = useState({ sku: '', region: '', adjustmentType: 'percent', adjustmentValue: 0, reason: '' });
  const { data = [], isLoading, refetch } = useQuery(['pricing', filters], () => fetchPricingRules(filters));
  const mutation = useMutation(overridePricing, {
    onSuccess: () => {
      refetch();
    }
  });

  const columns = [{ label: 'SKU', key: 'sku' }, { label: 'Region', key: 'region' }, { label: 'Adjustment', key: 'adjustmentValue' }, { label: 'Type', key: 'adjustmentType' }, { label: 'Reason', key: 'reason' }, { label: 'Created', key: 'createdAt' }];

  return (
    <div className="page-grid">
      <section className="card">
        <h2>Pricing overrides</h2>
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
            Search rules
          </button>
        </div>
        <div className="table-panel">
          {isLoading ? <p>Loading pricing rules...</p> : <DataTable columns={columns} data={data as Record<string, unknown>[]} />}
        </div>
      </section>
      <section className="card form-card">
        <h2>Override pricing</h2>
        <label>
          SKU
          <input value={overrideForm.sku} onChange={(event) => setOverrideForm({ ...overrideForm, sku: event.target.value })} />
        </label>
        <label>
          Region
          <input value={overrideForm.region} onChange={(event) => setOverrideForm({ ...overrideForm, region: event.target.value })} />
        </label>
        <label>
          Adjustment type
          <select value={overrideForm.adjustmentType} onChange={(event) => setOverrideForm({ ...overrideForm, adjustmentType: event.target.value as 'absolute' | 'percent' })}>
            <option value="percent">Percent</option>
            <option value="absolute">Absolute</option>
          </select>
        </label>
        <label>
          Value
          <input type="number" value={overrideForm.adjustmentValue} onChange={(event) => setOverrideForm({ ...overrideForm, adjustmentValue: Number(event.target.value) })} />
        </label>
        <label>
          Reason
          <input value={overrideForm.reason} onChange={(event) => setOverrideForm({ ...overrideForm, reason: event.target.value })} />
        </label>
        <button className="primary-button" onClick={() => mutation.mutate(overrideForm)}>
          Save override
        </button>
      </section>
    </div>
  );
}

export default PricingPage;
