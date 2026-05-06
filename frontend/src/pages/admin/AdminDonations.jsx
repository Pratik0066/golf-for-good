import React from 'react';
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, Filter, Download, Heart, Calendar } from 'lucide-react';

export default function AdminDonations() {
  // Mock data for donation transactions
  const donationHistory = [
    { id: "TXN-9921", charity: "Global Golf Youth", amount: "₹45,000", date: "24 Apr 2026", status: "Completed", drawRef: "#MegaDraw-47" },
    { id: "TXN-9918", charity: "Green Fairways NGO", amount: "₹22,500", date: "20 Apr 2026", status: "Completed", drawRef: "#MegaDraw-46" },
    { id: "TXN-9915", charity: "Education for All", amount: "₹38,000", date: "15 Apr 2026", status: "Processing", drawRef: "#MegaDraw-45" },
    { id: "TXN-9912", charity: "Global Golf Youth", amount: "₹12,000", date: "10 Apr 2026", status: "Completed", drawRef: "#Monthly-Draw" },
  ];

  const stats = [
    { label: "Total Distributed", value: "₹2,62,000", icon: <DollarSign size={20}/>, color: "text-[#84cc16]" },
    { label: "Pending Payouts", value: "₹38,000", icon: <Calendar size={20}/>, color: "text-yellow-400" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Donation Management</h1>
          <p className="text-gray-500 text-sm">Tracking capital flow from draws to charity partners.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/5">
            <Filter size={16} /> Filter
          </button>
          <button className="flex-1 md:flex-none bg-[#84cc16] hover:bg-[#a3e635] text-black px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
            <Download size={16} /> Report
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#161B22] p-6 rounded-3xl border border-white/5 flex items-center gap-6">
            <div className={`p-4 bg-white/5 rounded-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-[#161B22] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Distribution Ledger</h3>
          <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-gray-400">Showing last 30 days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">
                <th className="px-8 py-4">Charity Partner</th>
                <th className="px-8 py-4">Transaction ID</th>
                <th className="px-8 py-4">Draw Ref</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {donationHistory.map((txn) => (
                <tr key={txn.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400">
                        <Heart size={14} />
                      </div>
                      <span className="font-bold text-sm">{txn.charity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-500 font-mono text-xs">{txn.id}</td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
                      {txn.drawRef}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-[#84cc16] text-sm">{txn.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      txn.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right text-gray-500 text-xs font-bold">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-[#0B0E11]/50 border-t border-white/5 text-center">
          <button className="text-xs font-black text-gray-500 hover:text-[#84cc16] uppercase tracking-widest transition-all">
            View All Transactions
          </button>
        </div>
      </div>
    </motion.div>
  );
}