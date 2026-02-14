// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Scissors, User, Trash2 } from 'lucide-react';

const BookingManager = () => {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cRes, sRes, aRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/clients'),
        fetch('http://127.0.0.1:8000/services'),
        fetch('http://127.0.0.1:8000/appointments')
      ]);
      setClients(await cRes.json());
      setServices(await sRes.json());
      setAppointments(await aRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const serviceObj = services.find(s => s[1] === selectedService);
    const price = serviceObj ? serviceObj[2] : 0;

    const res = await fetch('http://127.0.0.1:8000/book-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: parseInt(selectedClient),
        service: selectedService,
        price: price,
        date: date,
        time: time
      }),
    });

    if (res.ok) {
      setSelectedClient('');
      setSelectedService('');
      setDate('');
      setTime('');
      fetchData();
    }
  };

  // Function to format the date string to be more readable (e.g., 2025-07-10 to 10 Jul)
  const formatDateShort = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* BOOKING FORM */}
      <div className="glass rounded-[2.5rem] p-8 elegant-shadow bg-white/50">
        <h2 className="text-3xl font-serif mb-6">New Appointment</h2>
        <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14}/> Client
            </label>
            <select 
              className="w-full p-3 bg-white rounded-xl border border-black/5 outline-none"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
            >
              <option value="">Select Client...</option>
              {clients.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <Scissors size={14}/> Treatment
            </label>
            <select 
              className="w-full p-3 bg-white rounded-xl border border-black/5 outline-none"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">Select Service...</option>
              {services.map(s => <option key={s[0]} value={s[1]}>{s[1]} (£{s[2]})</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <CalendarIcon size={14}/> Date
            </label>
            <input 
              type="date" 
              className="w-full p-3 bg-white rounded-xl border border-black/5 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <Clock size={14}/> Time
            </label>
            <div className="flex gap-2">
              <input 
                type="time" 
                className="w-full p-3 bg-white rounded-xl border border-black/5 outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <button type="submit" className="sage-bg text-white px-6 rounded-xl font-bold hover:opacity-90 transition-all">
                Book
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* UPCOMING SCHEDULE */}
      <div className="glass rounded-[2.5rem] p-8 elegant-shadow">
        <h3 className="text-xl font-serif mb-6">Upcoming Schedule</h3>
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <p className="text-neutral-400 italic text-center py-10">No appointments scheduled.</p>
          ) : (
            appointments.map(appt => (
              <div key={appt[0]} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  {/* Date & Time Badge */}
                  <div className="flex flex-col items-center bg-neutral-100 px-3 py-1 rounded-lg text-neutral-500 min-w-[70px]">
                    <span className="text-[10px] uppercase font-black tracking-tighter border-b border-black/5 w-full text-center">
                      {formatDateShort(appt[3])}
                    </span>
                    <span className="text-sm font-bold leading-tight mt-1">{appt[4]}</span>
                  </div>
                  
                  <div>
                    <p className="font-bold text-neutral-800">{appt[1] || 'Unknown Client'}</p>
                    <p className="text-xs text-neutral-400 flex items-center gap-1 uppercase tracking-wider font-medium">
                      <Scissors size={10} /> {appt[2]} — £{appt[6] ? appt[6].toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-widest">
                    {appt[5]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManager;