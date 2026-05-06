import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet as WalletIcon, ArrowUpRight, History, Loader2, IndianRupee } from "lucide-react";
import { toast } from "react-hot-toast";
import API from "../../api/axios";

export default function Wallet() {
  const [data, setData] = useState({ balance: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const fetchWalletData = async () => {
    try {
      // Matches backend logic for fetching current balance and history
      const res = await API.get("/user/wallet"); 
      setData(res.data);
    } catch (err) {
      toast.error("Failed to sync wallet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWalletData(); }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || withdrawAmount <= 0) return toast.error("Enter a valid amount");

    try {
      // PRD Section 11: Withdrawal requests sent to admin for approval[cite: 18]
      await API.post("/user/withdraw", { amount: Number(withdrawAmount) }); 
      toast.success("Withdrawal request submitted to admin");
      setWithdrawAmount("");
      fetchWalletData();
    } catch (err) { 
      toast.error(err.response?.data?.message || "Insufficient funds"); 
    }
  };

  if (loading) return <div className="p-20 text-[#84cc16] animate-pulse font-black italic">SYNCING WALLET...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white space-y-8 p-4 md:p-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Balance Card */}
        <div className="bg-[#161B22] p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#84cc16]"><WalletIcon size={120} /></div>
          <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Available Balance</p>
          <h2 className="text-5xl font-black italic mb-10 flex items-center gap-2">
            <span className="text-[#84cc16]">₹</span>{data.balance.toLocaleString()}
          </h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <input 
              type="number" 
              placeholder="Enter amount to withdraw"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full bg-[#0B0E11] border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[#84cc16]/50 transition-all"
            />
            <button className="w-full bg-[#84cc16] text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
              Request Payout <ArrowUpRight size={14} />
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 bg-[#161B22] p-10 rounded-[40px] border border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <History className="text-[#84cc16]" size={20} />
            <h3 className="text-lg font-black italic uppercase">Transaction Ledger</h3>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {data.transactions.map((tx, i) => (
              <div key={tx._id || i} className="flex justify-between items-center p-6 bg-[#0B0E11] rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${tx.type === 'win' ? 'bg-[#84cc16]/10 text-[#84cc16]' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'win' ? <IndianRupee size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight">{tx.type === 'win' ? 'Tournament Win' : 'Withdrawal'}</p>
                    <p className="text-[10px] text-gray-500 font-bold">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${tx.type === 'win' ? 'text-[#84cc16]' : 'text-white'}`}>
                    {tx.type === 'win' ? '+' : '-'}₹{tx.amount}
                  </p>
                  <p className="text-[10px] font-black uppercase text-gray-600 tracking-tighter">{tx.status || 'Processed'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}