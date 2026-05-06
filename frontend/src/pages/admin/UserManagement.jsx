// src/pages/admin/UserManagement.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Shield, UserMinus, Loader2 } from 'lucide-react';
import { toast } from "react-hot-toast";
import API from "../../api/axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) { 
      toast.error("Failed to load users"); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handlePromoteAdmin = async (userId, currentName) => {
    try {
      await API.put(`/admin/users/${userId}/role`, { role: 'admin' });
      toast.success(`${currentName} promoted to Admin`);
      fetchUsers(); // Refresh data
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  };

  const handleDeleteUser = async (userId, currentName) => {
    if (!window.confirm(`Delete ${currentName}?`)) return;

    try {
      await API.delete(`/admin/users/${userId}`);
      toast.success("User removed");
      setUsers(users.filter(u => u._id !== userId)); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove user");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-20 text-[#84cc16] animate-pulse">Syncing...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic">Player Directory</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search players..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161B22] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none"
          />
        </div>
      </div>

      <div className="bg-[#161B22] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 font-black uppercase tracking-widest">
            <tr>
              <th className="p-6 pl-8">Name</th>
              <th className="p-6">Subscription</th>
              <th className="p-6">Role</th>
              <th className="p-6 text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {filteredUsers.map((u) => (
              <tr key={u._id} className="hover:bg-white/[0.02]">
                <td className="p-6 pl-8 font-bold">{u.name}</td>
                <td className="p-6 text-gray-400">{u.subscriptionPlan || 'Basic'}</td>
                <td className="p-6 uppercase text-[10px] font-black">{u.role}</td>
                <td className="p-6 text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handlePromoteAdmin(u._id, u.name)}
                      className={`p-3 rounded-xl ${u.role === 'admin' ? 'text-[#84cc16]' : 'text-gray-500'}`}
                    >
                      <Shield size={16}/>
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(u._id, u.name)}
                      className="p-3 bg-red-500/10 rounded-xl text-red-500"
                    >
                      <UserMinus size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}