// @ts-nocheck
import React, { useState } from 'react'; // Added useState here
import * as Icons from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false); // New switch for mobile

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'clients', label: 'Client Vault', icon: 'Users' },
    { id: 'services', label: 'Service Menu', icon: 'Settings' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
  ];

  // Helper to handle clicks: switches tab AND closes menu on mobile
  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. MOBILE TOGGLE BUTTON - Only visible on small screens */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[110] p-3 bg-[#84a98c] text-white rounded-full shadow-lg"
      >
        {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
      </button>

      {/* 2. SIDEBAR - Now slides based on "isOpen" state */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r-4 border-[#84a98c] shadow-2xl flex flex-col p-8 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
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
                onClick={() => handleTabClick(item.id)}
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

      {/* 3. MOBILE OVERLAY - Click outside the menu to close it */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;