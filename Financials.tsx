// @ts-nocheck
import React from 'react';
import { Wallet, PieChart as PieChartIcon, TrendingUp, Heart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Payment, Client } from '../types';

interface FinancialsProps {
  data: {
    payments: Payment[];
    clients: Client[];
  };
}

const Financials: React.FC<FinancialsProps> = ({ data }) => {
  const totalRevenue = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const totalTips = data.payments.reduce((sum, p) => sum + p.tip, 0);

  // Group tips by client for "Top Tippers"
  const tippers = data.payments.reduce((acc: any, p) => {
    const client = data.clients.find(c => c.id === p.clientId);
    if (client) {
      acc[client.name] = (acc[client.name] || 0) + p.tip;
    }
    return acc;
  }, {});

  const topTippers = Object.entries(tippers)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-serif">Financials</h2>
          <p className="text-neutral-500 mt-1">Track your earnings and growth.</p>
        </div>
        <div className="flex gap-2">
          <button className="glass px-6 py-3 rounded-2xl text-sm font-medium hover:bg-white transition-all">Download Report</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Monthly Earnings" value={`£${totalRevenue.toLocaleString()}`} change="+8%" positive={true} />
        <SummaryCard title="Total Tips" value={`£${totalTips.toLocaleString()}`} change="+12%" positive={true} />
        <SummaryCard title="Avg. Booking" value="£52" change="-2%" positive={false} />
        <SummaryCard title="Net Profit" value={`£${(totalRevenue * 0.7).toLocaleString()}`} change="+5%" positive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment History */}
        <div className="lg:col-span-2 glass p-8 rounded-[3rem] elegant-shadow">
          <h3 className="text-2xl font-serif mb-8 flex items-center gap-2">
            <Wallet className="sage-text" size={24} />
            Payment Log
          </h3>
          <div className="space-y-4">
            {data.payments.map(payment => (
              <div key={payment.id} className="flex justify-between items-center p-4 bg-white/40 rounded-2xl border border-black/5 hover:border-sage-border transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center font-bold text-neutral-400">
                    £
                  </div>
                  <div>
                    <div className="font-semibold">{data.clients.find(c => c.id === payment.clientId)?.name}</div>
                    <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{payment.date} • {payment.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">£{payment.amount}</div>
                  {payment.tip > 0 && (
                    <div className="text-[10px] text-green-500 font-bold uppercase tracking-tighter flex items-center gap-1 justify-end">
                      <Heart size={8} fill="currentColor" /> +£{payment.tip} Tip
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tippers List */}
        <div className="glass p-8 rounded-[3rem] elegant-shadow bg-gradient-to-br from-white via-white to-sage-bg/5">
          <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
            <Heart className="text-rose-400" size={24} />
            Top Tippers
          </h3>
          <p className="text-xs text-neutral-500 mb-8 italic">Your most generous clients this month.</p>
          <div className="space-y-6">
            {topTippers.map(([name, tip]: any, idx) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-amber-100 text-amber-600' : 'bg-neutral-50 text-neutral-400'}`}>
                    {idx + 1}
                  </div>
                  <span className="font-medium">{name}</span>
                </div>
                <span className="font-serif font-bold text-lg">£{tip}</span>
              </div>
            ))}
            {topTippers.length === 0 && (
              <p className="text-center text-neutral-400 py-12 italic text-sm">No tips recorded yet.</p>
            )}
          </div>

          <div className="mt-12 p-6 bg-sage-bg rounded-[2rem] text-white text-center">
            <TrendingUp size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs uppercase tracking-widest font-bold opacity-80">Tip Growth</p>
            <p className="text-xl font-medium mt-1">Up 14% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, change, positive }: any) => (
  <div className="glass p-6 rounded-3xl elegant-shadow border border-black/5">
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{title}</span>
      <div className={`flex items-center text-[10px] font-bold ${positive ? 'text-green-500' : 'text-rose-500'}`}>
        {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {change}
      </div>
    </div>
    <div className="text-3xl font-serif font-semibold">{value}</div>
  </div>
);

export default Financials;
