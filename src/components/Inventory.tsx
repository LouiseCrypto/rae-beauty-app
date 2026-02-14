// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, ShoppingBag, Plus, Tag, CheckCircle2 } from 'lucide-react';

const Inventory = () => {
  // We add internal state so it doesn't rely on App.tsx
  const [inventory, setInventory] = useState([]);
  const [specialOrders, setSpecialOrders] = useState([]);

  useEffect(() => {
    // We'll placeholder this for now - once your Python API has /inventory, 
    // we just swap this out for a fetch!
    setInventory([
      { id: 1, name: '0.05 C-Curl Lashes', brand: 'London Lash', quantity: 2, minThreshold: 5, category: 'Lashes' },
      { id: 2, name: 'Sky Glue S+', brand: 'Sky', quantity: 12, minThreshold: 3, category: 'Adhesives' }
    ]);
    setSpecialOrders([
      { id: 1, itemName: 'Sensitive Adhesive', clientName: 'Sarah J.', status: 'Requested', dateRequested: '12 Feb' }
    ]);
  }, []);

  const lowStock = inventory.filter(i => i.quantity <= i.minThreshold);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif">Inventory & Purchasing</h2>
          <p className="text-neutral-500 mt-1">Keep your kit fully stocked.</p>
        </div>
        <button className="sage-bg text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:shadow-lg transition-all font-medium">
          <Plus size={18} /> Add Item
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] bg-white border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif flex items-center gap-2">
              <Package className="text-[#84a98c]" size={24} /> Stock Tracker
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-neutral-400 border-b border-black/5">
                  <th className="pb-4">Item</th>
                  <th className="pb-4">Brand</th>
                  <th className="pb-4 text-center">Stock</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-neutral-50/50">
                    <td className="py-4">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-[10px] text-neutral-400 uppercase">{item.category}</div>
                    </td>
                    <td className="py-4 text-neutral-600">{item.brand}</td>
                    <td className="py-4 text-center font-bold">{item.quantity}</td>
                    <td className="py-4">
                      {item.quantity <= item.minThreshold ? (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">Low Stock</span>
                      ) : (
                        <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">In Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50/50 p-6 rounded-[2rem] border border-red-100">
            <h4 className="text-red-800 font-serif mb-4 flex items-center gap-2"><AlertCircle size={18} /> Reorder</h4>
            {lowStock.map(i => <div key={i.id} className="text-sm bg-white p-2 mb-2 rounded-lg shadow-sm font-medium">{i.name}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;