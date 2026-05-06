// src/pages/admin/AdminVerify.jsx
import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import Modal from '../../components/shared/Modal';
import { toast } from 'react-hot-toast';
import { XCircle, CheckCircle } from 'lucide-react';

export default function AdminVerify() {
  const [pending, setPending] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    API.get('/admin/pending-scores').then(res => setPending(res.data));
  }, []);

  const openProof = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsModalOpen(true);
  };

  const handleAction = async (id, status) => {
    try {
      await API.put(`/admin/verify-score/${id}`, { status });
      setPending(prev => prev.filter(s => s._id !== id));
      toast.success(`Score ${status.toUpperCase()}`);
    } catch (err) { toast.error("Verification failed."); }
  };

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <h1 className="text-3xl font-black mb-10 italic">Verification Queue</h1>
      <div className="space-y-4">
        {pending.map(score => (
          <div key={score._id} className="bg-[#161B22] p-6 rounded-[32px] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#84cc16] rounded-xl flex items-center justify-center text-black font-black">{score.userId?.name?.[0]}</div>
              <div><p className="font-bold">{score.userId?.name}</p><p className="text-[10px] text-gray-500 uppercase">{score.userId?.email}</p></div>
            </div>
            {/* PRD Section 11: Proof Inspection Action */}
            <button 
              onClick={() => openProof(score.proofImage)}
              className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold hover:text-[#84cc16] transition-all"
            >
              View Scorecard
            </button>
            <div className="flex gap-2">
              <button onClick={() => handleAction(score._id, 'rejected')} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><XCircle size={18}/></button>
              <button onClick={() => handleAction(score._id, 'approved')} className="px-6 py-3 bg-[#84cc16] text-black rounded-xl font-black text-[10px] uppercase">Approve</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Scorecard Inspection">
        <img src={selectedImage} alt="Proof" className="w-full rounded-3xl border border-white/10" />
      </Modal>
    </div>
  );
}