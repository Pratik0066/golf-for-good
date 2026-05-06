// src/pages/admin/AdminSettings.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

export default function AdminSettings() {
  const [config, setConfig] = useState({ prizePool: 25000, charitySplit: 50 });

  useEffect(() => {
    API.get('/admin/config').then(res => setConfig(res.data));
  }, []);

  const handleSave = async () => {
    try {
      await API.put('/admin/config', config);
      alert("Platform configuration saved.");
    } catch (err) { alert("Save failed."); }
  };

  return (
    <div className="p-8 text-white space-y-8">
      <header className="flex justify-between items-center"><h1 className="text-2xl font-black">System Configuration</h1><button onClick={handleSave} className="bg-[#84cc16] text-black px-8 py-3 rounded-2xl font-black text-xs uppercase">Save Changes</button></header>
      <main className="max-w-3xl bg-[#161B22] border border-white/5 rounded-[40px] p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-500">Prize Pool (₹)</label><input type="number" value={config.prizePool} onChange={(e) => setConfig({...config, prizePool: e.target.value})} className="w-full bg-[#0B0E11] border border-white/10 rounded-xl p-4 text-white" /></div>
          <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-500">Charity Split (%)</label><input type="number" value={config.charitySplit} onChange={(e) => setConfig({...config, charitySplit: e.target.value})} className="w-full bg-[#0B0E11] border border-white/10 rounded-xl p-4 text-white" /></div>
        </div>
      </main>
    </div>
  );
}