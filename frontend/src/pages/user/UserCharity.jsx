import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Heart, Users, Target, ArrowRight, Loader2 } from 'lucide-react';
import API from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function UserCharity() {
  const [filter, setFilter] = useState('All');
  const [partners, setPartners] = useState([]);
  const [userStats, setUserStats] = useState({ totalDonated: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Public Charity Partners
        const partnersRes = await API.get('/charity');
        // Fetch User's Personalized Impact Stats
        const statsRes = await API.get('/user/stats');
        
        setPartners(partnersRes.data);
        setUserStats(statsRes.data);
      } catch (err) {
        toast.error("Failed to sync charity impact data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['All', ...new Set(partners.map(p => p.category || 'Platform'))];
  const filteredPartners = filter === 'All' ? partners : partners.filter(p => p.category === filter);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#84cc16]">
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="font-black italic uppercase tracking-widest">Calculating Impact...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white space-y-10">
      
      {/* Hero Impact Section */}
      <div className="relative p-10 rounded-[40px] bg-[#161B22] border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Heart size={200} strokeWidth={1} />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-black mb-4 italic">Support a Child's Future</h1>
          <p className="text-gray-400 font-medium leading-relaxed mb-8">
            50% of every entry goes directly toward non-profit beneficiaries. 
            Your participation fuels real-world change.
          </p>
          <div className="flex gap-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-400"><Heart /></div>
              <div>
                <p className="text-2xl font-black leading-none">₹{userStats.totalDonated || 0}</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Your Contribution</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Users /></div>
              <div>
                <p className="text-2xl font-black leading-none">1,200+</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Lives Touched</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
              filter === tab 
              ? 'bg-[#84cc16] text-black shadow-lg shadow-[#84cc16]/10' 
              : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPartners.map((item) => (
          <div key={item._id} className="group bg-[#161B22] rounded-[40px] border border-white/5 overflow-hidden transition-all hover:border-[#84cc16]/30">
            <div className="h-52 overflow-hidden relative">
              {/* Image utilizes the dynamic path from the backend uploads folder */}
              <img 
                src={`${import.meta.env.VITE_API_URL}${item.image || '/uploads/placeholder.jpg'}`} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-[#84cc16] text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                  {item.category || 'General'}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-black mb-3 italic">{item.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {item.description || "Active beneficiary of the GolfForGood platform initiative."}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2 text-[#84cc16]">
                    <Target size={14} />
                    <span className="text-xs font-black uppercase tracking-tighter">Impact Generated</span>
                  </div>
                  <span className="text-[10px] font-black text-white">₹{item.totalDonated || 0}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }} // Visual representation of impact
                    className="h-full bg-[#84cc16] rounded-full" 
                  />
                </div>
              </div>

              <a 
                href={item.website} 
                target="_blank" 
                rel="noreferrer"
                className="w-full mt-8 py-4 bg-white/5 group-hover:bg-[#84cc16] text-gray-500 group-hover:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                Official Website <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}