import { motion } from "framer-motion";
import { BarChart3, Download, TrendingUp, Filter } from 'lucide-react';

export default function AdminReports() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Platform Reports</h1>
          <p className="text-gray-500 text-sm">Detailed performance analytics and financial logs.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#161B22] border border-white/5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#252c35] transition-all">
          <Download size={16} /> Export CSV
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for specific reports */}
        <div className="bg-[#161B22] p-10 rounded-[32px] border border-white/5 flex flex-col items-center justify-center text-center">
           <BarChart3 size={48} className="text-[#84cc16] mb-4 opacity-50" />
           <h3 className="font-bold text-lg mb-2">Revenue Growth Report</h3>
           <p className="text-gray-500 text-xs mb-8">Quarterly analysis of subscription revenue vs prize payouts.</p>
           <button className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest hover:underline">Generate Report</button>
        </div>

        <div className="bg-[#161B22] p-10 rounded-[32px] border border-white/5 flex flex-col items-center justify-center text-center">
           <TrendingUp size={48} className="text-purple-400 mb-4 opacity-50" />
           <h3 className="font-bold text-lg mb-2">Winner Statistics</h3>
           <p className="text-gray-500 text-xs mb-8">Data on average Stableford scores and winner frequency.</p>
           <button className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest hover:underline">Generate Report</button>
        </div>
      </div>
    </motion.div>
  );
}