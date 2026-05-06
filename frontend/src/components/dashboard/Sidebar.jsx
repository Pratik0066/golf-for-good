// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Trophy, Wallet, User,  
  CreditCard, LogOut, Heart, BarChart3, Star, History, Gift, Settings, Users, 
  FilePenIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


export default function Sidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  // The 11 Essential Management Modules
  const adminMenu = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18}/> },
    { name: 'User Management', path: '/admin/users', icon: <Users size={18}/> },
    { name: 'Draw Engine', path: '/admin/draws', icon: <Star size={18}/> },
    { name: 'Score Verification', path: '/admin/verify', icon: <History size={18}/> },
    { name: 'Championship Winners', path: '/admin/winners', icon: <Trophy size={18}/> },
    { name: 'Charity Partners', path: '/admin/charity', icon: <Heart size={18}/> },
    { name: 'Donation Ledger', path: '/admin/donations', icon: <Gift size={18}/> },
    { name: 'Payout Requests', path: '/admin/payouts', icon: <Wallet size={18}/> },
    { name: 'Subscription MRR', path: '/admin/subs', icon: <CreditCard size={18}/> },
    { name: 'Platform Reports', path: '/admin/reports', icon: <BarChart3 size={18}/> },
    { name: 'System Settings', path: '/admin/settings', icon: <Settings size={18}/> },
  ];

  const userMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18}/> },
    { name: 'My Rolling 5', path: '/my-scores', icon: <Star size={18}/> },
    { name: 'Draw Results', path: '/draw-results', icon: <Trophy size={18}/> },
    { name: 'Draw History', path: '/history', icon: <History size={18}/> }, // 💡 NEW: Tournament History
    { name: 'Impact Center', path: '/user-charity', icon: <Heart size={18}/> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <BarChart3 size={18}/> },
    { name: 'Subscription', path: '/subscriptions', icon: <CreditCard size={18}/> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet size={18}/> },
    { name: 'Profile', path: '/profile', icon: <User size={18}/> },
    { name: 'Rules', path: '/rules', icon: <FilePenIcon size={18}/> }, // 💡 NEW: Fair Play Rules
  ];

  const menu = isAdmin ? adminMenu : userMenu;

  return (
    <aside className="w-64 h-screen bg-[#0B0E11] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-[#84cc16] rounded-xl flex items-center justify-center text-black font-black italic shadow-lg shadow-green-500/10">G</div>
        <div className="flex flex-col">
          <span className="text-white font-black text-sm leading-none tracking-tight">GolfForGood</span>
          <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.1em] mt-1">
            {isAdmin ? 'Admin Console' : 'Player Portal'}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menu.map((item) => (
          <NavLink 
            key={item.path} to={item.path} 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold transition-all ${
              isActive ? 'bg-[#84cc16]/10 text-[#84cc16] border-r-2 border-[#84cc16]' : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">
          <LogOut size={18}/> Logout
        </button>
      </div>
    </aside>
  );
}