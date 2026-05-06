// frontend/src/pages/user/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Target } from 'lucide-react';
import API from '../../api/axios';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await API.get('/leaderboard');
        setLeaders(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchLeaders();
  }, []);

  if (loading) return <div className="p-10 text-[#84cc16] animate-pulse font-black italic">RANKING PLAYERS...</div>;

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-black italic tracking-tight flex items-center gap-3">
            <Trophy className="text-[#84cc16]" /> Performance Ranking
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">
            Ranked by Rolling 5 Average Stableford
          </p>
        </div>
      </header>

      {/* Top 3 Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {leaders.slice(0, 3).map((player, i) => (
          <div key={i} className="bg-[#161B22] p-8 rounded-[40px] border border-white/5 relative overflow-hidden text-center group hover:border-[#84cc16]/50 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10"><Medal size={80} /></div>
            <div className="w-16 h-16 bg-[#84cc16] rounded-2xl mx-auto mb-4 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-green-500/20">
              {i + 1}
            </div>
            <h3 className="text-xl font-black mb-1">{player.name}</h3>
            <p className="text-[#84cc16] font-black text-3xl mb-4">{player.avg}</p>
            <span className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 rounded-full text-gray-400">
              {player.tier}Member
            </span>
          </div>
        ))}
      </div>

      {/* Table for remaining Top 10 */}
      <div className="bg-[#161B22] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
            <tr>
              <th className="p-8">Rank</th>
              <th className="p-8">Player</th>
              <th className="p-8 text-center">Rolling Avg[cite: 34]</th>
              <th className="p-8 text-right">Total Winnings[cite: 39]</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaders.map((player, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-8 font-black text-gray-500 italic">#{i + 1}</td>
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-black group-hover:text-[#84cc16]">
                      {player.name.charAt(0)}
                    </div>
                    <span className="font-bold">{player.name}</span>
                  </div>
                </td>
                <td className="p-8 text-center font-black text-xl text-[#84cc16]">{player.avg}</td>
                <td className="p-8 text-right font-black text-gray-400">₹{player.winnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}