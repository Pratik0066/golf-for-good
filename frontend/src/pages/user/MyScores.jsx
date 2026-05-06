// src/pages/user/MyScores.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add navigation for CTA
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext'; // Import Auth context
import { Plus, Upload, Loader2, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MyScores() {
  const { user } = useAuth(); // Access current user's subscription status
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchScores = async () => {
    try {
      const res = await API.get('/scores'); 
      setScores(res.data);
    } catch (err) { toast.error("Could not sync scores."); }
  };

  useEffect(() => { fetchScores(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check: Double-verify status before frontend submission
    if (!user?.isSubscribed) {
      return toast.error("Subscription required to post scores.");
    }

    if (!file) return toast.error("Scorecard photo required.");
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('stablefordValue', value);
    formData.append('image', file);

    try {
      await API.post('/scores', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }); 
      toast.success("Round submitted for verification!");
      fetchScores();
      setValue('');
      setFile(null);
    } catch (err) { 
      toast.error(err.response?.data?.message || "Submission failed."); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic uppercase">My Rolling 5 Engine</h1>
        <p className="text-gray-500 text-sm mt-2">Only verified rounds are eligible for the monthly championship.</p>
      </header>
      
      {/* --- CONDITIONAL RENDERING --- */}
      {user?.isSubscribed ? (
        /* PREMIUM VIEW: Show Submission Form */
        <div className="bg-[#161B22] p-10 rounded-[40px] border border-white/5 mb-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-end">
            <div className="flex-1 space-y-3 w-full">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest">Stableford Score (1-45)</label>
              <input 
                type="number" min="1" max="45" required 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                className="w-full bg-[#0B0E11] border border-white/10 rounded-2xl p-5 text-lg font-bold outline-none focus:border-[#84cc16] transition-all" 
              />
            </div>
            <div className="flex-1 space-y-3 w-full">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest">Scorecard Image</label>
              <label className="w-full h-[68px] bg-[#0B0E11] border border-dashed border-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:border-[#84cc16]/50 transition-all">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                  <Upload size={16} /> {file ? file.name : "Upload Official Scorecard"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
              </label>
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full lg:w-auto bg-[#84cc16] text-black px-12 h-[68px] rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Round"}
            </button>
          </form>
        </div>
      ) : (
        /* NON-PREMIUM VIEW: Show Locked CTA */
        <div className="bg-[#161B22] p-12 rounded-[40px] border border-[#84cc16]/20 mb-12 text-center">
          <div className="w-16 h-16 bg-[#84cc16]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#84cc16]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black italic uppercase mb-3">Participation Locked</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">
            You must have an active subscription to submit scores and participate in the monthly prize draws.
          </p>
          <button 
            onClick={() => navigate('/subscriptions')}
            className="bg-[#84cc16] text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 mx-auto hover:scale-105 transition-all shadow-xl shadow-[#84cc16]/10"
          >
            Upgrade to Premium <ArrowRight size={18} />
          </button>
        </div>
      )}
      
      {/* History Grid remains visible so they can see past verified rounds if they expired */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {scores.map((s, i) => (
          <div key={s._id} className="bg-[#161B22] p-8 rounded-[40px] border border-white/5 text-center relative group">
            <p className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-tighter">Round {i + 1}</p>
            <h2 className="text-5xl font-black text-[#84cc16] italic group-hover:scale-110 transition-transform">{s.stablefordValue}</h2>
            <div className={`mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
              s.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
            }`}>
              {s.status === 'approved' && <CheckCircle size={10} />} {s.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}