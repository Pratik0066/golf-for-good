// pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import StatsCard from '../../components/dashboard/StatsCard';
import { Users, CreditCard, Heart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats'); // Fetches: totalUsers, activeSubs, revenue, donations[cite: 2, 5]
        setStats(res.data);
      } catch (err) { console.error("Stats fetch failed"); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading || !stats) return <div className="p-8 text-[#84cc16] animate-pulse font-black">SYNCING ADMIN DATA...</div>;

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-black">Management Overview</h1>
        <p className="text-gray-500">Real-time platform metrics and financial health[cite: 5].</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard label="Total Players" value={stats.totalUsers} icon={<Users size={18}/>} color="text-blue-400" />
        <StatsCard label="Premium Members" value={stats.activeSubs} icon={<CreditCard size={18}/>} color="text-[#84cc16]" />
        <StatsCard label="Platform Revenue" value={stats.revenue} icon={<DollarSign size={18}/>} color="text-yellow-400" />
        <StatsCard label="Charity Impact" value={stats.donations} icon={<Heart size={18}/>} color="text-pink-400" />
      </div>
    </div>
  );
}