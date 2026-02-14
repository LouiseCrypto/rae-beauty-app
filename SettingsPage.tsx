// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Save, Palette, Building2, CheckCircle } from 'lucide-react';

const SettingsPage = ({ onUpdateBranding }) => {
  const [salonName, setSalonName] = useState('');
  const [color, setColor] = useState('#84a98c');
  const [saved, setSaved] = useState(false);

  // Load the current settings when the page opens
  useEffect(() => {
    fetch('http://127.0.0.1:8000/business-info')
      .then(res => res.json())
      .then(data => {
        setSalonName(data.salon_name);
        setColor(data.accent_color);
      });
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salon_name: salonName, accent_color: color }),
      });

      if (response.ok) {
        onUpdateBranding(salonName); // This updates the Sidebar instantly
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error("Failed to save settings");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass rounded-[2.5rem] p-10 elegant-shadow bg-white/50 backdrop-blur-xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-serif mb-2">Business Settings</h2>
            <p className="text-neutral-500">Tailor the app to match your professional brand.</p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full animate-in zoom-in">
              <CheckCircle size={18} />
              <span className="font-bold text-sm">Settings Saved</span>
            </div>
          )}
        </div>
        
        <div className="space-y-10">
          {/* SALON NAME SECTION */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">
              <Building2 size={14} /> Salon Name
            </label>
            <div className="bg-white/80 p-2 rounded-2xl border border-black/5 focus-within:border-neutral-300 transition-all">
              <input 
                className="w-full p-4 bg-transparent outline-none font-serif text-3xl text-neutral-800"
                placeholder="Enter Salon Name..."
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
              />
            </div>
          </div>

          {/* COLOR PICKER SECTION */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">
              <Palette size={14} /> Brand Accent Color
            </label>
            <div className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl border border-black/5">
              <div className="relative group">
                <input 
                  type="color" 
                  className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-sm transition-transform group-hover:scale-105"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <p className="font-mono text-xl text-neutral-700 uppercase">{color}</p>
                <p className="text-sm text-neutral-400">This color will be used for buttons and highlights.</p>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button 
            onClick={handleSave}
            style={{ backgroundColor: color }}
            className="w-full text-white p-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-95 active:scale-[0.98] transition-all shadow-lg shadow-black/5"
          >
            <Save size={20} /> Update Business Identity
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-6 text-center">
        <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
          Rae Beauty Platform — Version 1.0 (PRO)
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;