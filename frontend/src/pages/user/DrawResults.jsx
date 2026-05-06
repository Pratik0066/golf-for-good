import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Users, Ticket, CheckCircle, Clock, Star } from 'lucide-react';
import API from "../../api/axios";

export default function DrawResults() {
  const [data, setData] = useState({
    latestDraw: null,
    stats: null,
    loading: true
  });

  useEffect(() => {
    const fetchDrawData = async () => {
      try {
        const [drawRes, statsRes] = await Promise.all([
          API.get("/draw/latest"), // Fetches the most recent 'published' draw
          API.get("/user/stats")   // Checks if user has 5 approved entries
        ]);
        setData({
          latestDraw: drawRes.data,
          stats: statsRes.data,
          loading: false
        });
      } catch (err) {
        console.error("Error fetching draw data:", err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchDrawData();
  }, []);

  if (data.loading) return <div className="p-8 text-[#84cc16] animate-pulse font-black">SYNCING DRAW ENGINE...</div>;

  const isQualified = data.stats?.qualified || false; // PRD: Must have 5 approved scores

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-4 md:p-8 text-white bg-[#0B0E11] min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 italic">
              <Trophy className="text-[#84cc16]" size={32} />
              CHAMPIONSHIP DRAW
            </h1>
            <p className="text-gray-500 mt-1">Official results and monthly prize pool status.</p>
          </div>
          
          {/* QUALIFICATION STATUS */}
          <div className={`flex items-center gap-4 px-6 py-4 rounded-[24px] border ${
            isQualified ? "bg-[#84cc16]/10 border-[#84cc16]/20" : "bg-red-500/10 border-red-500/20"
          }`}>
            {isQualified ? <CheckCircle size={20} className="text-[#84cc16]" /> : <Clock size={20} className="text-red-500" />}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Draw Eligibility</p>
              <p className={`text-sm font-black ${isQualified ? "text-[#84cc16]" : "text-red-500"}`}>
                {isQualified ? "QUALIFIED" : "INCOMPLETE ENTRIES"}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LATEST RESULTS PANEL */}
          <div className="lg:col-span-2 bg-[#161B22] p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Star size={120} />
            </div>

            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8">Latest Winning Numbers</h3>
            
            {data.latestDraw ? (
              <div className="space-y-10">
                <div className="flex flex-wrap gap-4">
                  {data.latestDraw.winningNumbers?.map((num, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-[#84cc16] text-black rounded-[24px] flex items-center justify-center text-3xl font-black shadow-xl shadow-green-500/20"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-10 pt-10 border-t border-white/5">
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Prize Pool</p>
                    <p className="text-2xl font-black">₹{data.latestDraw.prizePool || "500"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Draw Date</p>
                    <p className="text-2xl font-black">{new Date(data.latestDraw.createdAt).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-600 font-bold uppercase tracking-widest">
                Waiting for next official publication.
              </div>
            )}
          </div>

          {/* SIDEBAR INFO */}
          <div className="space-y-6">
            <div className="bg-[#161B22] p-8 rounded-[40px] border border-white/5">
              <h4 className="font-black text-sm uppercase mb-6 flex items-center gap-2">
                <Ticket className="text-[#84cc16]" size={18} /> How to Win
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-xs font-bold text-gray-400 leading-relaxed">
                  <span className="text-[#84cc16]">01</span> Maintain 5 verified scores in your Rolling 5 engine[cite: 12, 34].
                </li>
                <li className="flex gap-3 text-xs font-bold text-gray-400 leading-relaxed">
                  <span className="text-[#84cc16]">02</span> Premium members get 1 entry; Elite members get 2x weight[cite: 29].
                </li>
                <li className="flex gap-3 text-xs font-bold text-gray-400 leading-relaxed">
                  <span className="text-[#84cc16]">03</span> Winning numbers are drawn 1-45 every month[cite: 10].
                </li>
              </ul>
            </div>

            <div className="bg-[#84cc16] p-8 rounded-[40px] text-black">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Impact Summary</p>
              <p className="text-sm font-bold leading-relaxed mb-6">
                50% of the prize pool from this draw was donated to our charity partners.
              </p>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                View Impact Report
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}