// src/pages/Auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", {
        name: form.name, email: form.email, password: form.password
      });
      login(res.data); 
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black p-4 rounded-2xl mb-6 text-center uppercase tracking-widest">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="flex flex-col gap-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
          <input
            type="text" name="name" required onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none text-sm text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
          <input
            type="email" name="email" required onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none text-sm text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password" name="password" required onChange={handleChange}
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none text-sm text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Confirm</label>
            <input
              type="password" name="confirmPassword" required onChange={handleChange}
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl focus:border-[#84cc16] outline-none text-sm text-white"
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="bg-[#84cc16] text-black py-5 rounded-2xl font-black mt-4 transition-all shadow-xl shadow-[#84cc16]/10 uppercase text-xs tracking-widest"
        >
          {loading ? "Creating Profile..." : "Register & Start"}
        </button>
      </form>
    </div>
  );
}