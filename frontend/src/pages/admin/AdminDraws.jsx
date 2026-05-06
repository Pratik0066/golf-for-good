import React, { useState } from 'react';
import { Star, Play, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast'; // PRD Section 12: Professional notifications
import API from '../../api/axios';

export default function AdminDraws() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * PRD Section 06: Admin-only draw execution[cite: 11]
   * Fixed Endpoint: Changed from /admin/execute-draw to /draw/execute-draw 
   * to match the mounting in server.js.
   */
  const triggerDraw = async (mode, isSimulation) => {
    setLoading(true);
    try {
      // Logic: POST /api/draw/execute-draw[cite: 11, 12]
      const res = await API.post('/draw/execute-draw', { 
        mode, 
        isSimulation,
        totalPrizePool: 1000 // PRD Section 07: Total Pool for tiered distribution
      }); 
      
      setResult(res.data);
      toast.success(isSimulation ? "SIMULATION COMPLETED" : "OFFICIAL DRAW PUBLISHED");
    } catch (err) {
      // PRD Section 02: Replace alert() with non-blocking toast
      toast.error(err.response?.data?.message || "Draw engine synchronization failed.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic">Draw Engine</h1>
        <p className="text-gray-500 text-sm">PRD Range: 1-45 | Tiered Distribution: 40/35/25.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Execution Controls */}
        <div className="bg-[#161B22] p-10 rounded-[40px] border border-white/5">
          <h3 className="font-black text-sm uppercase text-[#84cc16] mb-8 tracking-widest">Controls</h3>
          <div className="space-y-4">
            <button 
              disabled={loading}
              onClick={() => triggerDraw('random', true)} 
              className="w-full p-6 bg-white/5 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16}/>}
              Run Simulation (Internal Only)
            </button>
            <button 
              disabled={loading}
              onClick={() => triggerDraw('algorithmic', false)} 
              className="w-full p-6 bg-[#84cc16] text-black rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
            >
              <Star size={16}/> Publish Official Draw
            </button>
          </div>
        </div>

        {/* Results Display */}
        {result && (
          <div className="bg-[#161B22] p-10 rounded-[40px] border border-[#84cc16]/30 shadow-2xl shadow-[#84cc16]/5">
            <h3 className="font-black text-sm uppercase text-gray-500 mb-8 tracking-widest">
              {result.status === 'simulated' ? 'Simulation Results' : 'Official Results'}
            </h3>
            <div className="flex flex-wrap gap-4 mb-10">
              {result.winningNumbers?.map((num, i) => (
                <div 
                  key={`${num}-${i}`} 
                  className="w-14 h-14 bg-[#84cc16] text-black flex items-center justify-center rounded-2xl font-black text-2xl italic shadow-lg shadow-[#84cc16]/20"
                >
                  {num}
                </div>
              ))}
            </div>
            
            <div className="space-y-2 border-t border-white/5 pt-6">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Status: <span className="text-[#84cc16]">{result.status}</span>
              </p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Pool Total: <span className="text-white">₹{result.prizePoolTotal}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}