// components/dashboard/PerformanceChart.jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceChart({ data }) {
  // Use backend data or an empty state if no scores exist
  const chartData = data?.length > 0 ? data : [{ name: 'N/A', score: 0 }];

  return (
    <div className="h-[320px] w-full bg-[#161B22] p-8 rounded-[32px] border border-white/5">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-black italic uppercase text-xs tracking-widest opacity-50">Handicap Trend</h3>
        <span className="text-[10px] font-black text-[#84cc16] bg-[#84cc16]/10 px-3 py-1 rounded-full uppercase">Stableford</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis hide domain={[0, 45]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B0E11', border: '1px solid #1f2937', borderRadius: '16px' }} 
            itemStyle={{ color: '#84cc16', fontSize: '12px', fontWeight: '900' }}
          />
          <Area type="monotone" dataKey="score" stroke="#84cc16" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}