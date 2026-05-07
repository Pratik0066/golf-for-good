import React, { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import API from '../api/axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function CharitySlider() {
  const { user, setUser } = useAuth();
  // Default to 10 if not set, matching PRD minimum
  const [percentage, setPercentage] = useState(user?.charityPercentage || 10);
  const [isSaving, setIsSaving] = useState(false);

  // Assuming a baseline calculation on the Premium ₹599 plan for UI context
  const subscriptionAmount = user?.subscriptionPlan === 'Elite' ? 1499 : 599;
  const calculatedDonation = (subscriptionAmount * (percentage / 100)).toFixed(0);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data } = await API.put('/users/charity', { 
        charityPercentage: percentage,
        selectedCharity: user?.selectedCharity || "General Education Fund"
      });
      setUser(data.user); // Update global context
      toast.success("Impact settings saved!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update impact.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#161B22] p-8 rounded-[40px] border border-white/5 w-full max-w-2xl text-white">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#84cc16]/10 rounded-2xl flex items-center justify-center text-[#84cc16]">
          <Heart fill="currentColor" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black italic uppercase">My Impact Split</h2>
          <p className="text-gray-500 text-xs font-bold mt-1">
            Mandatory 10% minimum. Increase your contribution to empower more youth.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <span className="text-5xl font-black text-[#84cc16]">{percentage}%</span>
          <span className="text-sm font-bold text-gray-500 mb-2">
            ₹{calculatedDonation} / month
          </span>
        </div>
        
        {/* The Interactive Slider */}
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={percentage} 
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full h-3 bg-[#0B0E11] rounded-lg appearance-none cursor-pointer accent-[#84cc16]"
        />
        <div className="flex justify-between text-[10px] text-gray-600 font-black mt-3 uppercase tracking-widest">
          <span>10% (Min)</span>
          <span>100% (Max)</span>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={isSaving || percentage === user?.charityPercentage}
        className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-3 ${
          percentage === user?.charityPercentage 
            ? "bg-white/5 text-gray-500 cursor-not-allowed" 
            : "bg-[#84cc16] text-black hover:scale-105"
        }`}
      >
        {isSaving ? <Loader2 className="animate-spin" size={18} /> : "Update Impact"}
      </button>
    </div>
  );
}