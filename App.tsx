// @ts-nocheck
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BookingManager from './components/BookingManager';
import ClientVault from './components/ClientVault';
import ServiceMenu from './components/ServiceMenu';
import Inventory from './components/Inventory';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // We provide this 'dummy' data so Inventory.tsx doesn't crash when you click it
  const inventoryData = {
    inventory: [
      { id: 1, name: 'Lash Adhesive', brand: 'Premium', quantity: 5, minThreshold: 2, category: 'Glue' }
    ],
    specialOrders: []
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calendar':  return <BookingManager />;
      case 'clients':   return <ClientVault />;
      case 'services':  return <ServiceMenu />;
      case 'inventory': return <Inventory data={inventoryData} />;
      default:          return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* 1. Sidebar on the left */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main content area */}
      <main className="flex-1 p-6 lg:p-12 lg:ml-72 transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;