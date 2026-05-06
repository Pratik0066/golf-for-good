import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import Login from '../Auth/Login'; 
import Signup from '../Auth/Signup';
import Navbar from '../../components/landing/Navbar'; //[cite: 15]

export default function Home() {
  const [authMode, setAuthMode] = useState(null); // null, 'login', or 'signup'

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0B0E11]">
      
      {/* Synchronized Navbar: Triggers the hero auth state[cite: 16] */}
      <Navbar onAuthClick={(mode) => setAuthMode(mode)} />

      {/* Cinematic Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1668177025402-04649c9d2b42?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, 
          filter: authMode ? 'blur(10px) brightness(0.3)' : 'none' 
        }}
      >
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          authMode ? 'bg-black/60' : 'bg-gradient-to-r from-black/90 via-black/20 to-transparent'
        }`} />
      </div>

      <div className="container mx-auto px-10  relative z-10 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-center pt-20">
          
          {/* LEFT: Hero Content */}
          <motion.div 
            animate={{ x: authMode ? -50 : 0, opacity: authMode ? 0.4 : 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-7xl md:text-8xl font-black text-white leading-[0.9] mb-8 italic uppercase tracking-tighter">
              Play for <br /> <span className="text-[#84cc16]">The Future.</span>
            </h1>
            <p className="text-gray-200 text-lg font-medium max-w-lg mb-10 leading-relaxed drop-shadow-md">
              Every Stableford point you score fuels education for underprivileged youth. Join the elite community turning passion into purpose.
            </p>
            {!authMode && (
              <div className="flex gap-4">
                <button 
                  onClick={() => setAuthMode('signup')} 
                  className="bg-[#84cc16] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Modular Auth Component Overlay[cite: 15] */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              {authMode && (
                <motion.div 
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="w-full max-w-md bg-white/5 backdrop-blur-3xl p-10 rounded-[48px] border border-white/10 shadow-2xl relative"
                >
                  <button 
                    onClick={() => setAuthMode(null)} 
                    className="absolute top-8 right-8 text-white/50 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl font-black text-white mb-2 uppercase italic">
                    {authMode === 'login' ? 'Welcome' : 'Join Us'}
                  </h2>
                  <div className="mt-8">
                    {authMode === 'login' ? <Login /> : <Signup />}
                  </div>
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
                    className="mt-8 text-[10px] font-black text-[#84cc16] uppercase tracking-widest text-center w-full"
                  >
                    {authMode === 'login' ? "New Player? Register" : "Member? Sign In"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}