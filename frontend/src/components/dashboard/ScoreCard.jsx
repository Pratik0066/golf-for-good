export default function ScoreCard({ score, date, status }) {
  return (
    <div className="bg-[#161B22] border border-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#84cc16]/10 rounded-xl flex items-center justify-center text-[#84cc16] font-black text-xl shadow-inner">
          {score}
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
            {new Date(date).toLocaleDateString()}
          </p>
          <h4 className="text-white font-bold text-sm">Championship Entry</h4>
        </div>
      </div>
      <span className="text-[8px] font-black uppercase bg-white/5 px-2 py-1 rounded-md text-gray-400">
        {status}
      </span>
    </div>
  );
}