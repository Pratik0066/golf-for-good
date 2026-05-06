import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#161B22] border border-[#84cc16]/20 p-10 rounded-[40px] text-center shadow-2xl shadow-[#84cc16]/5"
      >
        <div className="w-20 h-20 bg-[#84cc16]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Trophy className="text-[#84cc16]" size={40} />
        </div>
        
        <h1 className="text-3xl font-black text-white mb-4 italic">Tier Upgraded!</h1>
        <p className="text-gray-500 mb-10 font-medium">
          Your payment was successful. Your account has been synchronized with the new subscription benefits.
        </p>

        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-[#84cc16] text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-105 transition-all"
        >
          Go to Dashboard <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}