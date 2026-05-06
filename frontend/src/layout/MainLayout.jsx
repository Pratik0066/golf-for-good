import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/landing/Navbar'; // or wherever your Navbar is

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* 1. This renders your Navbar on every public page */}
      <Navbar />

      {/* 2. This is the "placeholder" where Home, About, etc. will appear */}
      <main>
        <Outlet /> 
      </main>

      {/* 3. Optional: Add a simple footer to anchor the page */}
      <footer className="py-10 text-center text-gray-600 text-xs border-t border-white/5">
        © 2026 GolfForGood. Leading with Impact.
      </footer>
    </div>
  );
}