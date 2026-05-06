import { useState } from "react";
import { Settings, Shield, LogOut, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import API from "../../api/axios";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: user?.name || "", 
    bio: user?.bio || "" 
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Logic: Update user profile fields in the database
      const { data } = await API.put("/auth/update-profile", formData); 
      
      // Update global context and local storage[cite: 19]
      setUser(data); 
      setIsEditing(false);
      toast.success("Profile synchronized with server");
    } catch (err) { 
      toast.error("Synchronization failed. Check connection."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black italic">Account Settings</h1>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-2xl font-black text-xs uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Status Card */}
          <div className="bg-[#161B22] p-10 rounded-[40px] border border-white/5 text-center relative overflow-hidden">
            <div className="w-28 h-28 bg-gradient-to-br from-[#84cc16] to-[#a3e635] rounded-[40px] mx-auto mb-6 flex items-center justify-center text-black text-5xl font-black shadow-xl shadow-[#84cc16]/20">
              {user?.name?.charAt(0)}
            </div>
            <h2 className="text-2xl font-black italic">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">{user?.email}</p>
            
            <div className="bg-[#0B0E11] p-6 rounded-3xl border border-white/5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield size={16} className="text-[#84cc16]" />
                <span className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest">{user?.subscriptionPlan || 'Basic'} Tier</span>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Member since {new Date(user?.createdAt).getFullYear() || '2026'}</p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2 bg-[#161B22] p-10 rounded-[40px] border border-white/5">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-black italic uppercase text-lg flex items-center gap-3">
                <Settings size={22} className="text-[#84cc16]" /> User Profile
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all ${isEditing ? 'bg-red-500/10 text-red-500' : 'bg-[#84cc16]/10 text-[#84cc16]'}`}
              >
                {isEditing ? "Discard Changes" : "Edit Details"}
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Display Name</label>
                <input 
                  disabled={!isEditing} 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0B0E11] border border-white/10 rounded-2xl p-5 text-white disabled:opacity-40 outline-none focus:border-[#84cc16]/50 transition-all font-bold" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Golfer Bio</label>
                <textarea 
                  disabled={!isEditing} 
                  rows="4" 
                  value={formData.bio} 
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Share your golf journey..."
                  className="w-full bg-[#0B0E11] border border-white/10 rounded-2xl p-5 text-white disabled:opacity-40 outline-none focus:border-[#84cc16]/50 transition-all resize-none font-medium leading-relaxed"
                />
              </div>

              {isEditing && (
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-[#84cc16] text-black font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-3 w-full md:w-auto uppercase text-xs tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-[#84cc16]/10"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <><CheckCircle size={18} /> Update Server</>}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}