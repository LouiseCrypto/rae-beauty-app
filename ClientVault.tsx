// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { UserPlus, Phone, Mail, FileText, Trash2, Edit2, Search } from 'lucide-react';

const ClientVault = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Added for search
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await fetch('http://127.0.0.1:8000/clients');
    const data = await res.json();
    setClients(data);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/add-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, notes }),
    });
    if (res.ok) {
      setName(''); setPhone(''); setEmail(''); setNotes('');
      fetchClients();
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm("Are you sure? This will remove the client and their history.")) {
      const res = await fetch(`http://127.0.0.1:8000/delete-client/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchClients();
    }
  };

  // Logic to filter clients based on the search bar
  const filteredClients = clients.filter(client => 
    client[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client[2] && client[2].includes(searchTerm))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ADD CLIENT FORM */}
      <div className="glass rounded-[2.5rem] p-8 elegant-shadow bg-white/50 border border-white">
        <h2 className="text-3xl font-serif mb-6 text-neutral-800">New Client Entry</h2>
        <form onSubmit={handleAddClient} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Full Name" className="p-4 rounded-2xl border border-black/5 bg-white outline-none focus:ring-2 focus:ring-neutral-200 transition-all" value={name} onChange={(e) => setName(e.target.value)} required />
            <input placeholder="Phone Number" className="p-4 rounded-2xl border border-black/5 bg-white outline-none focus:ring-2 focus:ring-neutral-200 transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Email Address" className="p-4 rounded-2xl border border-black/5 bg-white outline-none focus:ring-2 focus:ring-neutral-200 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <textarea 
            placeholder="Client Notes (Allergies, preferences, color history...)" 
            className="w-full p-4 rounded-2xl border border-black/5 bg-white outline-none h-24 focus:ring-2 focus:ring-neutral-200 transition-all"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="submit" className="w-full bg-neutral-900 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 hover:shadow-lg transition-all active:scale-[0.98]">
            <UserPlus size={18} /> Register Client
          </button>
        </form>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <Search size={20} />
        </div>
        <input 
          type="text"
          placeholder="Search by name or phone..."
          className="w-full pl-12 pr-4 py-4 rounded-full border border-black/5 bg-white/50 elegant-shadow outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CLIENT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <div key={client[0]} className="glass rounded-[2rem] p-6 elegant-shadow bg-white/80 border border-white hover:translate-y-[-4px] transition-all group">
              <div className="flex justify-between items-start mb-4 border-b border-black/5 pb-3">
                <h3 className="text-xl font-serif text-neutral-800">{client[1]}</h3>
                {/* Fixed for Mobile: md: prefix ensures opacity is only 0 on desktop */}
                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteClient(client[0])}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-neutral-500 mb-4">
                <p className="flex items-center gap-2"><Phone size={14} className="text-neutral-400" /> {client[2] || 'No phone'}</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-neutral-400" /> {client[3] || 'No email'}</p>
              </div>

              {client[4] && (
                <div className="bg-neutral-50/50 p-4 rounded-xl border border-black/[0.03]">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1 flex items-center gap-1 tracking-widest">
                    <FileText size={10} /> Consult Note
                  </p>
                  <p className="text-neutral-600 italic text-sm leading-relaxed">"{client[4]}"</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-neutral-400 italic">
            No clients found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientVault;