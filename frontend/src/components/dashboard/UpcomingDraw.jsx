import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', score: 32 }, { name: 'Feb', score: 38 }, { name: 'Mar', score: 35 },
  { name: 'Apr', score: 42 }, { name: 'May', score: 40 }, { name: 'Jun', score: 45 },
];

export default function PerformanceChart() {
  return (
    <div className="h-[300px] w-full bg-[#161B22] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-white font-bold mb-6">Performance Overview</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#0B0E11', border: '1px solid #374151' }} />
          <Area type="monotone" dataKey="score" stroke="#84cc16" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}