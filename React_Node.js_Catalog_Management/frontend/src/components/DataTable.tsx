import { ReactNode } from 'react';

interface DataTableProps {
  columns: { label: string; key: string }[];
  data: Record<string, unknown>[];
  actions?: (row: Record<string, unknown>) => ReactNode;
  onRowClick?: (row: Record<string, unknown>) => void;
  selectedRowIds?: Set<number>;
}

export function DataTable({ columns, data, actions, onRowClick, selectedRowIds }: DataTableProps) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)}>No records found.</td>
          </tr>
        ) : (
          data.map((item, index) => {
            const id = Number(item.id ?? index);
            const isSelected = selectedRowIds?.has(id) ?? false;
            return (
              <tr
                key={`row-${index}`}
                className={onRowClick ? 'clickable-row' : ''}
                onClick={() => onRowClick?.(item)}
                style={isSelected ? { backgroundColor: 'rgba(59, 130, 246, 0.16)' } : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key}>{String(item[col.key] ?? '')}</td>
                ))}
                {actions && <td>{actions(item)}</td>}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
