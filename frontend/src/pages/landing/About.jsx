import React from 'react';

export default function About() {
  return (
    <div className="bg-[#020617] text-white pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#84cc16] font-black uppercase tracking-[0.3em] text-[10px]">Our Mission</span>
        <h1 className="text-6xl font-black mt-4 mb-10">Where Passion <br/> Meets Philanthropy.</h1>
        
        <div className="space-y-8 text-gray-400 text-lg leading-relaxed">
          <p>
            GolfForGood was founded in 2024 by a group of golfers who wanted to do more with their weekend rounds. 
            We noticed that while golf is a game of integrity and discipline, the community lacked a centralized 
            way to turn competitive play into collective social good.
          </p>
          <p className="text-white font-bold">
            "Our goal is to create the world's largest community of golfers who play not just for the trophy, 
            but for the next generation."
          </p>
          <p>
            By combining a high-stakes prize draw with verified charitable giving, we've created a platform 
            where everyone wins. The better you play, the higher your rank, and the more we give back.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-12">
          <div>
            <p className="text-3xl font-black text-white">₹1.2M</p>
            <p className="text-xs font-black uppercase text-gray-500 tracking-tighter">Total Raised</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">5k+</p>
            <p className="text-xs font-black uppercase text-gray-500 tracking-tighter">Members</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">150</p>
            <p className="text-xs font-black uppercase text-gray-500 tracking-tighter">Clubs</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">12</p>
            <p className="text-xs font-black uppercase text-gray-500 tracking-tighter">NGO Partners</p>
          </div>
        </div>
      </div>
    </div>
  );
}