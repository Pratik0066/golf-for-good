import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout"; // For Public Pages
import DashboardLayout from "./layout/Layout"; // Contains Sidebar_3.jsx
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ToastProvider from "./components/shared/Toast";

// --- PUBLIC PAGES ---
import Home from './pages/landing/Home';
import HowItWorks from './pages/landing/HowItWorks';
import About from './pages/landing/About';
import CharityDir from './pages/landing/Charity2';

// --- AUTH & LIFECYCLE ---
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Success from "./pages/Auth/Success"; // Stripe Success
import Cancel from "./pages/Auth/Cancel";   // Stripe Cancel

// --- USER MODULES ---
import Dashboard from "./pages/user/Dashboard";
import MyScores from "./pages/user/MyScores";
import DrawResults from "./pages/user/DrawResults";
import TournamentHistory from './pages/user/TournamentHistory';
import Rules from "./pages/user/Rules";
import UserCharity from "./pages/user/UserCharity";
import Leaderboard from "./pages/user/Leaderboard";
import Wallet from "./pages/user/Wallet";
import Subscriptions from "./pages/user/Subscriptions";
import Profile from "./pages/user/Profile";

// --- ADMIN MODULES ---
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AdminVerify from "./pages/admin/AdminVerify";
import AdminDraws from "./pages/admin/AdminDraws";
import AdminWinners from "./pages/admin/AdminWinners";
import AdminCharity from "./pages/admin/AdminCharity";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <BrowserRouter>
      {/* Professional UI notifications */}
      <ToastProvider /> 
      
      <Routes>
        {/* --- Public & Auth Routes (Using MainLayout) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/charity-impact" element={<CharityDir />} />
          
          
          
          {/* PRD Section 04: Stripe Payment Endpoints */}
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-cancelled" element={<Cancel />} />
        </Route>

        {/* --- Private Portal Routes (Protected & DashboardLayout) --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            
            {/* User Portal Modules */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-scores" element={<MyScores />} />
            <Route path="/draw-results" element={<DrawResults />} />
            <Route path="/history" element={<TournamentHistory />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/user-charity" element={<UserCharity />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Management Modules[cite: 30] */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/verify" element={<AdminVerify />} />
            <Route path="/admin/draws" element={<AdminDraws />} />
            <Route path="/admin/winners" element={<AdminWinners />} />
            <Route path="/admin/charity" element={<AdminCharity />} />
            <Route path="/admin/donations" element={<AdminDonations />} />
            <Route path="/admin/payouts" element={<AdminPayouts />} />
            <Route path="/admin/subs" element={<AdminSubscriptions />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}