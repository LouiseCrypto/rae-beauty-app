// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, PoundSterling, Tag } from 'lucide-react';

const ServiceMenu = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchServices = async () => {
    const res = await fetch('http://127.0.0.1:8000/services');
    setServices(await res.json());
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:8000/add-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName(''); setPrice('');
    fetchServices();
  };

  const deleteService = async (id) => {
    await fetch(`http://127.0.0.1:8000/delete-service/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="glass rounded-[2.5rem] p-10 elegant-shadow">
        <h2 className="text-3xl font-serif mb-2">Service Menu</h2>
        <p className="text-neutral-500 mb-8">Define your treatments and pricing.</p>

        <form onSubmit={handleAdd} className="flex gap-4 mb-10 bg-neutral-50 p-6 rounded-3xl border border-black/5">
          <div className="flex-1">
            <input 
              placeholder="Treatment Name (e.g. BIAB Full Set)"
              className="w-full p-3 bg-white rounded-xl border border-black/5 outline-none"
              value={name} onChange={(e) => setName(e.target.value)} required
            />
          </div>
          <div className="w-32 relative">
            <span className="absolute left-3 top-3 text-neutral-400">£</span>
            <input 
              type="number" step="0.01" placeholder="0.00"
              className="w-full p-3 pl-7 bg-white rounded-xl border border-black/5 outline-none"
              value={price} onChange={(e) => setPrice(e.target.value)} required
            />
          </div>
          <button type="submit" className="sage-bg text-white px-6 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus size={18} /> Add
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s[0]} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-black/5 hover:border-[#84a98c]/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-[#84a98c]">
                  <Tag size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">{s[1]}</h4>
                  <p className="text-sm font-medium text-[#52796f]">£{s[2].toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => deleteService(s[0])} className="text-neutral-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;