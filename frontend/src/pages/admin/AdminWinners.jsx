import { motion } from "framer-motion";
import { Star, CheckCircle2, Search } from 'lucide-react';

export default function AdminWinners() {
  const winners = [
    { name: "Liam G.", prize: "₹1,20,000", match: "5/5", date: "Apr 2026", status: "Paid" },
    { name: "Sarah K.", prize: "₹80,000", match: "4/5", date: "Apr 2026", status: "Pending" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black">Championship Winners</h1>
        <div className="bg-[#161B22] px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
            <Star className="text-yellow-500" size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Hall of Fame</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {winners.map((w, i) => (
          <div key={i} className="bg-[#161B22] p-6 rounded-[24px] border border-white/5 flex items-center justify-between group hover:border-[#84cc16]/30 transition-all">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 bg-[#0B0E11] rounded-2xl flex items-center justify-center font-black text-yellow-500 border border-white/5">{i+1}</div>
               <div>
                  <h4 className="font-black text-lg">{w.name}</h4>
                  <p className="text-xs text-gray-500">{w.date} Draw • {w.match} Matches</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-xl font-black text-[#84cc16]">{w.prize}</p>
               <span className={`text-[10px] font-black uppercase tracking-widest ${w.status === 'Paid' ? 'text-blue-400' : 'text-orange-400'}`}>
                 {w.status}
               </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}