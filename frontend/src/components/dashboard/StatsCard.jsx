export default function StatsCard({ label, value, icon, color }) {
  return (
    <div className="bg-[#161B22] p-6 rounded-[28px] border border-white/5 group hover:border-white/10 transition-all">
      <div className={`${color} mb-6 bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
    </div>
  );
}