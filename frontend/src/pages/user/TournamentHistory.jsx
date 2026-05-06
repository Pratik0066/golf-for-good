// src/pages/user/TournamentHistory.jsx
import React, { useEffect, useState } from 'react';
import { Calendar, Trophy, Download, Search } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function TournamentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetches all past draws the user participated in
        const res = await API.get('/draw/history');
        setHistory(res.data);
      } catch (err) {
        toast.error("Failed to load archive.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="p-8 text-[#84cc16] animate-pulse font-black italic">OPENING ARCHIVES...</div>;

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-12">
        <h1 className="text-3xl font-black italic uppercase flex items-center gap-3">
          <Calendar className="text-[#84cc16]" /> Championship Archive
        </h1>
        <p className="text-gray-500 text-sm">Review your past performances and platform-wide draw results.</p>
      </header>

      <div className="space-y-6">
        {history.length > 0 ? history.map((draw) => (
          <div key={draw._id} className="bg-[#161B22] p-8 rounded-[40px] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 hover:border-[#84cc16]/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-[#84cc16]/10 rounded-3xl text-[#84cc16]">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="font-black text-xl italic uppercase tracking-tight">{draw.monthName} {draw.year}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Winning Numbers: {draw.winningNumbers.join(', ')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-center">
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Your Avg</p>
                <p className="text-xl font-black text-white">{draw.userSnapshotAvg || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Prize Pool</p>
                <p className="text-xl font-black text-[#84cc16]">₹{draw.prizePool}</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Status</p>
                <p className="text-xl font-black text-gray-400">Completed</p>
              </div>
            </div>

            <button className="p-4 bg-white/5 rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all">
              <Download size={20} />
            </button>
          </div>
        )) : (
          <div className="py-20 text-center bg-[#161B22] rounded-[40px] border border-dashed border-white/10">
            <Search className="mx-auto text-gray-700 mb-4" size={48} />
            <p className="font-black text-gray-500 uppercase tracking-[0.2em]">No history found yet</p>
          </div>
        )}
      </div>
    </div>
  );
}