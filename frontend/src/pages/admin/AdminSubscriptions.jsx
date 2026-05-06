import { motion } from "framer-motion";
import { CreditCard, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

export default function AdminSubscriptions() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
      <header className="mb-10">
        <h1 className="text-2xl font-black">Subscription Analytics</h1>
        <p className="text-gray-500 text-sm">Monitoring MRR (Monthly Recurring Revenue) and Tier distribution.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Elite Tier", val: "142", trend: "+12", color: "text-purple-400" },
          { label: "Premium Tier", val: "640", trend: "+45", color: "text-[#84cc16]" },
          { label: "Churn Rate", val: "2.4%", trend: "-0.5", color: "text-red-400" },
        ].map((item, i) => (
          <div key={i} className="bg-[#161B22] p-8 rounded-[32px] border border-white/5 shadow-2xl">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black">{item.val}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.trend} <ArrowUpRight size={12}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161B22] p-10 rounded-[32px] border border-white/5 flex flex-col items-center justify-center text-center opacity-50 border-dashed">
        <Package size={48} className="mb-4 text-gray-600" />
        <h4 className="font-bold">Subscription Logs</h4>
        <p className="text-xs text-gray-500 max-w-xs mt-1">Detailed Stripe webhook events will appear here in production.</p>
      </div>
    </motion.div>
  );
}