import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B0E11] border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-6 h-6 bg-[#84cc16] rounded flex items-center justify-center text-black font-black text-xs italic">G</div>
             <span className="text-white font-black uppercase tracking-tighter">GolfForGood</span>
          </div>
          <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">
            Changing the game off the course. Verified impact, real-time synchronization, and monthly championship rewards.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 italic">Platform</h4>
          <div className="flex flex-col gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
            <Link to="/how-it-works" className="hover:text-[#84cc16]">How it works</Link>
            <Link to="/leaderboard" className="hover:text-[#84cc16]">Leaderboard</Link>
            <Link to="/rules" className="hover:text-[#84cc16]">Verification Rules</Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 italic">Transparency</h4>
          <div className="flex flex-col gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
            <Link to="/charity-impact" className="hover:text-[#84cc16]">NGO Partners</Link>
            <Link to="/terms" className="hover:text-[#84cc16]">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] text-center">
        © 2026 GolfForGood Platform • All Rights Reserved[cite: 22]
      </div>
    </footer>
  );
}