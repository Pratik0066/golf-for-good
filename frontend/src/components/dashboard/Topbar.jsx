// components/layout/Topbar.jsx
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { user } = useAuth(); 

  return (
    <header className="h-20 bg-[#0B0E11] border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search matches or charities..." 
          className="w-full bg-[#161B22] border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:border-[#84cc16] outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#84cc16] rounded-full border-2 border-[#0B0E11]" />
        </button>
        
        <div className="h-8 w-[1px] bg-white/5" />
        
        <div className="flex items-center gap-3 group">
          <div className="text-right">
            <p className="text-xs font-bold text-white group-hover:text-[#84cc16] transition-colors">
              {user?.name || "Guest"}
            </p>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">
              {user?.subscriptionPlan || "Basic"} Member
            </p>
          </div>
          <div className="w-10 h-10 bg-[#161B22] border border-white/5 rounded-xl flex items-center justify-center text-[#84cc16] font-black">
            {user?.name?.charAt(0) || <User size={20} />}
          </div>
        </div>
      </div>
    </header>
  );
}