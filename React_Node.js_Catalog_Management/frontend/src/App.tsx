import { useState } from 'react';
import CatalogPage from './pages/CatalogPage';
import PricingPage from './pages/PricingPage';
import InventoryPage from './pages/InventoryPage';

const tabs = [
  { id: 'catalog', label: 'Catalog' },
  { id: 'pricing', label: 'Pricing Rules' },
  { id: 'inventory', label: 'Inventory' }
];

function App() {
  const [activeTab, setActiveTab] = useState('catalog');

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Catalog Management Platform</h1>
        <p>Operations dashboard for product metadata, pricing overrides, and inventory workflows.</p>
      </header>

      <nav className="tab-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="content-panel">
        {activeTab === 'catalog' && <CatalogPage />}
        {activeTab === 'pricing' && <PricingPage />}
        {activeTab === 'inventory' && <InventoryPage />}
      </main>
    </div>
  );
}

export default App;
