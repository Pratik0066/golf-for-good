// src/pages/admin/AdminDraws.jsx
import React, { useState } from 'react';
import { Star, Play, Loader2, TrendingUp, Users, Wallet } from 'lucide-react';
import { toast } from 'react-hot-toast'; 
import API from '../../api/axios';

export default function AdminDraws() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calls the newly updated backend controller
  const triggerDraw = async (mode, isSimulation) => {
    setLoading(true);
    try {
      // Adjust this endpoint if your route is exactly /draw/execute-draw
      const res = await API.post('/draw/execute', { 
        mode, 
        isSimulation 
      }); 
      
      setResult(res.data);
      toast.success(isSimulation ? "SIMULATION COMPLETED" : "OFFICIAL DRAW PUBLISHED");
    } catch (err) {
      toast.error(err.response?.data?.message || "Draw engine synchronization failed.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic">Draw Engine</h1>
        <p className="text-gray-500 text-sm">PRD Range: 1-45 | Tiered Distribution: 40/35/25 | Jackpot Rollover Active.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- LEFT: EXECUTION CONTROLS --- */}
        <div className="bg-[#161B22] p-10 rounded-[40px] border border-white/5 h-fit">
          <h3 className="font-black text-sm uppercase text-[#84cc16] mb-8 tracking-widest">Controls</h3>
          <div className="space-y-4">
            <button 
              disabled={loading}
              onClick={() => triggerDraw('random', true)} 
              className="w-full p-6 bg-white/5 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16}/>}
              Run Pre-Analysis Simulation
            </button>
            <button 
              disabled={loading}
              onClick={() => triggerDraw('random', false)} 
              className="w-full p-6 bg-[#84cc16] text-black rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
            >
              <Star size={16}/> Publish Official Draw
            </button>
          </div>
          <p className="text-[10px] text-gray-500 mt-6 font-bold uppercase tracking-widest leading-relaxed">
            Note: Running a simulation calculates the current pool and matches user scores but does NOT payout wallets or save to history.
          </p>
        </div>

        {/* --- RIGHT: RESULTS DISPLAY --- */}
        {result && (
          <div className={`p-10 rounded-[40px] border shadow-2xl transition-all ${
            result.mode === "SIMULATION" 
              ? "bg-[#161B22] border-blue-500/30 shadow-blue-500/5" 
              : "bg-[#161B22] border-[#84cc16]/30 shadow-[#84cc16]/5"
          }`}>
            <h3 className={`font-black text-sm uppercase mb-8 tracking-widest ${result.mode === "SIMULATION" ? "text-blue-500" : "text-[#84cc16]"}`}>
              {result.mode} RESULTS
            </h3>
            
            {/* The Winning Numbers */}
            <div className="flex flex-wrap gap-4 mb-10">
              {result.winningNumbers?.map((num, i) => (
                <div 
                  key={`${num}-${i}`} 
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl font-black text-2xl italic shadow-lg ${
                    result.mode === "SIMULATION" ? "bg-blue-500 text-white shadow-blue-500/20" : "bg-[#84cc16] text-black shadow-[#84cc16]/20"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            
            {/* Financial Overview */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0B0E11] p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-2"><TrendingUp size={12}/> Month Revenue Pool</p>
                <p className="text-xl font-black mt-1">₹{result.financials.totalGeneratedPool.toFixed(2)}</p>
              </div>
              <div className="bg-[#0B0E11] p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-2"><Wallet size={12}/> Previous Rollover</p>
                <p className="text-xl font-black mt-1">₹{result.financials.previousRollover.toFixed(2)}</p>
              </div>
            </div>

            {/* Tier Breakdown */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Payout Distribution</h4>
              
              <div className="flex justify-between items-center p-4 bg-[#0B0E11] rounded-2xl border border-yellow-500/20">
                <div>
                  <p className="text-sm font-black text-yellow-500 uppercase italic">Tier 1 (5 Matches)</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 flex items-center gap-1"><Users size={12}/> {result.results.tier1_5Match.count} Winners</p>
                </div>
                <div className="text-right">
                  <p className="font-black">₹{result.results.tier1_5Match.payoutEach.toFixed(2)} <span className="text-[10px] text-gray-500 uppercase">/each</span></p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#0B0E11] rounded-2xl border border-white/5">
                <div>
                  <p className="text-sm font-black text-white uppercase italic">Tier 2 (4 Matches)</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 flex items-center gap-1"><Users size={12}/> {result.results.tier2_4Match.count} Winners</p>
                </div>
                <div className="text-right">
                  <p className="font-black">₹{result.results.tier2_4Match.payoutEach.toFixed(2)} <span className="text-[10px] text-gray-500 uppercase">/each</span></p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#0B0E11] rounded-2xl border border-white/5">
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase italic">Tier 3 (3 Matches)</p>
                  <p className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1"><Users size={12}/> {result.results.tier3_3Match.count} Winners</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-400">₹{result.results.tier3_3Match.payoutEach.toFixed(2)} <span className="text-[10px] text-gray-600 uppercase">/each</span></p>
                </div>
              </div>
            </div>

            {/* Rollover Alert */}
            {result.financials.newRolloverAmount > 0 && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <p className="text-xs font-black text-red-400 uppercase tracking-widest">
                  🚨 Jackpot Rollover Triggered: ₹{result.financials.newRolloverAmount.toFixed(2)} carrying forward to next month!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}