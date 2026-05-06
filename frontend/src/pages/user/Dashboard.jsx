// src/pages/user/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Trophy, Star, Gift, Calendar, Plus, Loader2, Upload } from 'lucide-react';
import StatsCard from "../../components/dashboard/StatsCard";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import Modal from "../../components/shared/Modal"; 
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [data, setData] = useState({ user: null, stats: null });
  const [loading, setLoading] = useState(true);
  
  // Submission State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [stablefordValue, setStablefordValue] = useState('');

  const fetchDashboardData = async () => {
    try {
      const [userRes, statsRes] = await Promise.all([
        API.get("/auth/me"),
        API.get("/user/stats")
      ]);
      setData({ user: userRes.data, stats: statsRes.data });
    } catch (err) { 
      toast.error("Synchronization failed."); 
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // PRD Section 10: Integrated Submission Logic
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Scorecard photo required for verification.");
    if (stablefordValue < 1 || stablefordValue > 45) return toast.error("Score must be between 1-45.");

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('stablefordValue', stablefordValue);
    formData.append('image', file); 

    try {
      await API.post('/scores', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }); 
      toast.success("Round submitted! Pending admin verification.");
      setIsModalOpen(false);
      setStablefordValue('');
      setFile(null);
      fetchDashboardData(); // Refresh stats after submission
    } catch (err) { 
      toast.error(err.response?.data?.message || "Submission failed."); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-[#84cc16] animate-pulse font-black uppercase tracking-widest">
      Fetching Engine Data...
    </div>
  );

  return (
    <div className="p-4 md:p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black italic">Hi, {data.user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 text-xs md:text-sm">Real-time performance synchronization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#84cc16] text-black px-4 md:px-6 py-3 rounded-2xl font-black text-[10px] md:text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-[#84cc16]/20"
        >
          <Plus size={18} /> New Round
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Rolling Avg" value={data.stats?.avg || '0.0'} icon={<Trophy />} color="text-[#84cc16]" />
        <StatsCard title="Verified Rounds" value={data.stats?.verifiedCount || '0'} icon={<Star />} color="text-yellow-400" />
        <StatsCard title="Total Impact" value={`₹${data.stats?.totalDonated || 0}`} icon={<Gift />} color="text-red-400" />
        <StatsCard title="Draw Status" value={data.stats?.qualified ? "Qualified" : "Pending"} icon={<Calendar />} color={data.stats?.qualified ? "text-green-400" : "text-gray-500"} />
      </div>

      {/* Visual Analytics[cite: 24] */}
      <div className="bg-[#161B22] p-6 md:p-10 rounded-[40px] border border-white/5 shadow-2xl">
        <h3 className="text-lg font-black italic uppercase mb-8">Performance Trend</h3>
        <div className="h-[300px]">
          <PerformanceChart data={data.stats?.history || []} />
        </div>
      </div>

      {/* PRD Section 10: Functional Score Submission Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Submit New Round"
      >
        <form onSubmit={handleScoreSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Stableford Score (1-45)</label>
            <input 
              required
              type="number" 
              min="1" 
              max="45"
              placeholder="e.g. 38" 
              value={stablefordValue}
              onChange={(e) => setStablefordValue(e.target.value)}
              className="w-full bg-[#0B0E11] border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#84cc16] transition-all font-bold" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Official Scorecard Photo</label>
            <label className="w-full h-24 bg-[#0B0E11] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#84cc16]/50 transition-all">
              <Upload size={20} className="text-gray-600 mb-2" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                {file ? file.name : "Select Image to Verify Round"}
              </span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-[#84cc16] text-black py-5 rounded-3xl font-black uppercase italic text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#a3e635] transition-all"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={18} /> Processing...</>
            ) : (
              "Confirm & Submit Round"
            )}
          </button>
          <p className="text-[10px] text-center text-gray-500 font-medium uppercase leading-relaxed">
            Admin verification takes 24-48 hours. Ensure the photo is clear[cite: 29].
          </p>
        </form>
      </Modal>
    </div>
  );
}