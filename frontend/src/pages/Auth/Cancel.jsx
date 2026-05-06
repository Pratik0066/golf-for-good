import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#161B22] border border-red-500/10 p-10 rounded-[40px] text-center"
      >
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="text-red-500" size={32} />
        </div>
        
        <h1 className="text-2xl font-black text-white mb-4">Payment Cancelled</h1>
        <p className="text-gray-500 mb-10 text-sm">
          The transaction was not completed. No charges were made to your account.
        </p>

        <button 
          onClick={() => navigate('/subscriptions')}
          className="w-full bg-white/5 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all border border-white/5"
        >
          <RefreshCw size={18} /> Retry Selection
        </button>
      </motion.div>
    </div>
  );
}