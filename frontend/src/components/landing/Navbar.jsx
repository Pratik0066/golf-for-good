// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onAuthClick }) {
  const { user } = useAuth();

  return (
    <div className="fixed top-6 w-full z-[100] px-6">
      <nav className="max-w-7xl mx-auto h-16 bg-transparent backdrop-blur-xl border border-white/10 rounded-full px-8 flex items-center justify-between shadow-2xl">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#84cc16] rounded-lg flex items-center justify-center text-black font-black italic text-sm">G</div>
          <span className="text-white font-black uppercase tracking-tighter text-sm">GolfForGood</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['How It Works', 'About', 'Charity Impact'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[9px] font-black uppercase text-white  hover:text-[#84cc16] tracking-[0.2em] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Auth Actions synchronized with Hero State */}
        <div className="flex items-center gap-6">
          {user ? (
            <Link to="/dashboard" className="bg-[#84cc16] text-black px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:scale-105">
              Portal
            </Link>
          ) : (
            <>
              {/* Trigger Login in Hero Section */}
              <button 
                onClick={() => onAuthClick('login')}
                className="text-white font-black text-[9px] uppercase tracking-[0.2em] hover:text-[#84cc16] transition-colors"
              >
                Sign In
              </button>
              
              {/* Trigger Signup in Hero Section */}
              <button 
                onClick={() => onAuthClick('signup')}
                className="bg-white text-black px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-[#84cc16] transition-all"
              >
                Join Now
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}