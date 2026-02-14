// @ts-nocheck
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Briefcase, Truck } from 'lucide-react';
import { Appointment } from '../types';

interface SmartCalendarProps {
  data: {
    appointments: Appointment[];
  };
  onUpdate: () => void;
}

const SmartCalendar: React.FC<SmartCalendarProps> = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const addMinutes = (time: string, mins: number) => {
    const [h, m] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + mins);
    return date.toTimeString().slice(0, 5);
  };

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return data.appointments
      .filter(a => a.date === dateStr)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const dayAppointments = getAppointmentsForDay(currentDate);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-serif">Smart Calendar</h2>
          <p className="text-neutral-500 mt-1">Intelligent scheduling with mobile buffers.</p>
        </div>
        <div className="glass flex items-center p-2 rounded-2xl elegant-shadow">
          <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))} className="p-2 hover:bg-black/5 rounded-xl transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="px-6 font-semibold flex items-center gap-2">
            <CalendarIcon size={16} className="sage-text" />
            {currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))} className="p-2 hover:bg-black/5 rounded-xl transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl elegant-shadow">
            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">Legend</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 sage-bg rounded-full"></div>
                <span>Service Time</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 bg-neutral-200 rounded-full"></div>
                <span>Prep & Pack (15m)</span>
              </div>
            </div>
          </div>
          <div className="bg-sage-bg/10 p-6 rounded-3xl border border-sage-border/20">
            <h4 className="text-sm font-serif font-bold sage-text mb-2">Efficiency Tip</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Buffers are automatically calculated. You have {dayAppointments.length * 15} minutes of prep time scheduled today.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-3 space-y-6">
          {dayAppointments.length > 0 ? (
            <div className="relative pl-12 space-y-8 py-4">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-100"></div>

              {dayAppointments.map((appt, idx) => {
                const prepTimeStart = addMinutes(appt.time, -15);
                const serviceEnd = addMinutes(appt.time, appt.durationMinutes);
                const packTimeEnd = addMinutes(serviceEnd, 15);

                return (
                  <div key={appt.id} className="relative group">
                    {/* Time Marker */}
                    <div className="absolute -left-[44px] top-0 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-white border-2 sage-border z-10"></div>
                      <span className="text-[10px] font-bold text-neutral-400 mt-2 bg-white px-1">
                        {appt.time}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Prep Buffer */}
                      <div className="flex items-center gap-3 text-xs text-neutral-400 italic px-4 py-1 ml-4 border-l-2 border-dashed border-neutral-200">
                        <Truck size={12} />
                        Prep & Pack Buffer ({prepTimeStart} - {appt.time})
                      </div>

                      {/* Main Service Card */}
                      <div className="ml-4 glass p-6 rounded-[2rem] border-l-4 sage-border elegant-shadow group-hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold sage-text uppercase tracking-widest">{appt.service}</span>
                            <h3 className="text-xl font-serif font-bold mt-1">{appt.clientName}</h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-lg font-medium">£{appt.price}</span>
                            <span className="text-[10px] text-neutral-400">{appt.durationMinutes} mins</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Buffer */}
                      <div className="flex items-center gap-3 text-xs text-neutral-400 italic px-4 py-1 ml-4 border-l-2 border-dashed border-neutral-200">
                        <Briefcase size={12} />
                        Sanitise & Pack ({serviceEnd} - {packTimeEnd})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass h-64 rounded-[3rem] flex flex-col items-center justify-center text-neutral-400 border-dashed border-2 border-black/5">
              <Clock size={48} className="mb-4 opacity-10" />
              <p className="font-serif text-xl">Rest day scheduled</p>
              <p className="text-sm italic">No client bookings for this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartCalendar;
