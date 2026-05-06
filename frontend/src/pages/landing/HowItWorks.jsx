import React from 'react';
import { Target, Upload, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: <Target className="text-[#84cc16]" size={32}/>, title: "Play Your Round", desc: "Play your regular weekend golf at any certified club[cite: 31]." },
    { icon: <Upload className="text-[#84cc16]" size={32}/>, title: "Upload Score", desc: "Submit your Stableford score and a photo of your scorecard[cite: 31]." },
    { icon: <Trophy className="text-[#84cc16]" size={32}/>, title: "Enter the Draw", desc: "Your top 5 scores qualify you for our monthly mega prize draw[cite: 31]." },
  ];

  return (
    <div className="relative min-h-screen pt-40 pb-20 text-white px-6 bg-fixed bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070')` }}>
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-6xl font-black mb-20 text-center italic">How It <span className="text-[#84cc16]">Works</span></h1>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-2xl p-12 rounded-[50px] border border-white/10 relative group hover:border-[#84cc16]/50 transition-all shadow-2xl">
              <div className="bg-white/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-[#84cc16] group-hover:text-black transition-all duration-500 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{step.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">{step.desc}</p>
              <span className="absolute top-12 right-12 text-7xl font-black text-white/5 pointer-events-none italic">0{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}