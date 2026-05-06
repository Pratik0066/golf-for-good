import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#0B0E11]">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <Outlet /> {/* Child pages like Dashboard, Entries, etc. render here */}
        </main>
      </div>
    </div>
  );
}