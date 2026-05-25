import { ChangeEvent } from 'react';

interface FilterPanelProps {
  filters: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  return (
    <section className="filter-panel">
      <div className="filter-group">
        <label htmlFor="term">Search</label>
        <input
          id="term"
          value={filters.term}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('term', event.target.value)}
          placeholder="SKU, name, or category"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="region">Region</label>
        <input
          id="region"
          value={filters.region}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('region', event.target.value)}
          placeholder="North America, EU"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange('status', event.target.value)}
        >
          <option value="">Any</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </section>
  );
}
