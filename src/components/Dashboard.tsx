// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Users, Package, DollarSign, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    active_clients: 0,
    today_appointments: 0,
    revenue: 0
  });

  const fetchStats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/dashboard-stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log("Waiting for Python...");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-serif text-neutral-800">Welcome back, Rae</h2>
        <p className="text-neutral-500 mt-2 italic font-medium">Your studio looks great today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2.5rem] elegant-shadow">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl w-fit mb-4"><DollarSign /></div>
          <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Monthly Revenue</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">£{stats.revenue}</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] elegant-shadow">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl w-fit mb-4"><Users /></div>
          <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Total Clients</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{stats.active_clients}</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] elegant-shadow">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl w-fit mb-4"><Calendar /></div>
          <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Today's Bookings</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{stats.today_appointments}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;