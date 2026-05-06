import React from 'react';
import { motion } from 'framer-motion';

// Ensure 'export default' is present here
export default function Skeleton({ className }) {
  return (
    <div className={`relative overflow-hidden bg-[#161B22] rounded-xl ${className}`}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
    </div>
  );
}