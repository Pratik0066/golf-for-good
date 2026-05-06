// src/pages/Auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login({ token: res.data.token, user: res.data.user }); 
      res.data.user.role === "admin" ? navigate("/admin") : navigate("/dashboard");
    } catch (err) {
      alert("Login failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
          <input
            type="email" name="email" required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none transition-all text-sm text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
          <input
            type="password" name="password" required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none transition-all text-sm text-white"
          />
        </div>

        <button 
          disabled={loading} 
          className="bg-[#84cc16] text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-[#84cc16]/10"
        >
          {loading ? "Authenticating..." : "Enter Dashboard"}
        </button>
      </form>
    </div>
  );
}