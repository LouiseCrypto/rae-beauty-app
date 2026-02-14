// @ts-nocheck
import React from 'react';
import * as Icons from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'clients', label: 'Client Vault', icon: 'Users' },
    { id: 'services', label: 'Service Menu', icon: 'Settings' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r-4 border-[#84a98c] shadow-2xl flex flex-col p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-serif italic text-neutral-800">Rae Beauty</h1>
        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Studio Manager</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = Icons[item.icon] || Icons.HelpCircle;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all
                ${isActive 
                  ? 'bg-[#84a98c] text-white shadow-lg' 
                  : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'}
              `}
            >
              <IconComponent size={20} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;