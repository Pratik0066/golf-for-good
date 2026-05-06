// pages/admin/AdminPayouts.jsx
import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Check, X } from 'lucide-react';

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    API.get('/payouts').then(res => setPayouts(res.data));
  }, []);

  const handleAction = async (id, status) => {
   await API.put(`/payouts/${id}`, { status });
  setPayouts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="text-white p-8">
      <h1 className="text-2xl font-black mb-10">Withdrawal Requests</h1>
      <div className="bg-[#161B22] rounded-[32px] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 font-black uppercase tracking-widest">
            <tr><th className="p-6">User Email</th><th className="p-6">Amount</th><th className="p-6">Status</th><th className="p-6 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payouts.map(p => (
              <tr key={p._id} className="hover:bg-white/[0.02]">
                <td className="p-6 font-bold">{p.userId?.email}</td>
                <td className="p-6 font-black text-[#84cc16]">₹{p.amount}</td>
                <td className="p-6"><span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-orange-500/10 text-orange-400">{p.status}</span></td>
                <td className="p-6 flex justify-end gap-2">
                  <button onClick={() => handleAction(p._id, 'Rejected')} className="p-3 bg-red-500/10 text-red-500 rounded-xl"><X size={16}/></button>
                  <button onClick={() => handleAction(p._id, 'Paid')} className="p-3 bg-[#84cc16]/10 text-[#84cc16] rounded-xl"><Check size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}