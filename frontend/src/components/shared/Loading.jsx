import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="p-8 w-full max-w-6xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-[#161B22] rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-[#161B22] border border-gray-800 rounded-3xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-[#161B22] border border-gray-800 rounded-3xl animate-pulse" />
    </div>
  );
}