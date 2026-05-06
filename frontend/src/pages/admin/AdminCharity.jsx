import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Heart, Globe, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast'; // PRD Section 12: Professional notifications[cite: 17]
import Modal from '../../components/shared/Modal'; // Using your reusable modal component

export default function AdminCharity() {
  const [charities, setCharities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [newCharity, setNewCharity] = useState({ name: '', website: '', description: '' });

  // PRD Section 11: Manage charity listings
  // Initial fetch using the correct admin prefix as mounted in server.js[cite: 16, 17]
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await API.get('/admin/charity-partners');
        setCharities(res.data);
      } catch (err) {
        toast.error("Failed to sync charity directory");
      } finally {
        setFetching(false);
      }
    };
    fetchCharities();
  }, []);

  // Logic: POST /api/admin/charity-partners to register a new non-profit beneficiary[cite: 15, 16]
  const handleAddPartner = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Use FormData for file uploads[cite: 14]
  const formData = new FormData();
  formData.append("name", newCharity.name);
  formData.append("website", newCharity.website);
  formData.append("description", newCharity.description);
  if (imageFile) formData.append("image", imageFile);

  try {
    const res = await API.post('/admin/charity-partners', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setCharities([...charities, res.data]);
    setIsModalOpen(false);
    toast.success("PARTNER REGISTERED WITH IMAGE");
  } catch (err) {
    toast.error("Upload failed");
  } finally {
    setLoading(false);
  }
};

  // PRD Section 11: Remove partner / Restrict access
  const handleDelete = async (id, name) => {
    if (window.confirm(`PERMANENTLY remove ${name}?`)) {
      try {
        // Corrected path for administrative deletion
        await API.delete(`/admin/charity-partners/${id}`);
        setCharities(prev => prev.filter(c => c._id !== id));
        toast.success("PARTNER REMOVED FROM PLATFORM");
      } catch (err) {
        toast.error("Deletion failed. Verify admin role.");
      }
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#84cc16]">
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="font-black italic uppercase tracking-widest">Loading Charity Directory...</p>
    </div>
  );

  return (
    <div className="p-8 text-white bg-[#0B0E11] min-h-screen">
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black italic">Charity Partners</h1>
          <p className="text-gray-500 text-sm">Managing non-profit beneficiaries for the platform split.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#84cc16] text-black px-6 py-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-[#84cc16]/10"
        >
          <Plus size={18}/> Add Partner
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map(c => (
          <div key={c._id} className="bg-[#161B22] p-8 rounded-[40px] border border-white/5 hover:border-[#84cc16]/20 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-red-500/10 rounded-2xl text-red-400 group-hover:scale-110 transition-transform">
                <Heart size={24}/>
              </div>
              <button 
                onClick={() => handleDelete(c._id, c.name)} 
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18}/>
              </button>
            </div>
            
            <h3 className="text-xl font-black mb-1 group-hover:text-[#84cc16] transition-colors">{c.name}</h3>
            <p className="text-xs text-gray-500 mb-8 flex items-center gap-2 font-mono">
              <Globe size={14}/> {c.website}
            </p>
            
            <div className="bg-[#0B0E11] p-5 rounded-3xl flex justify-between items-center border border-white/5">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Impact Generated</p>
              <p className="text-xl font-black text-white italic">₹{c.totalDonated || 0}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Register New Partner"
      >
        <form onSubmit={handleAddPartner} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Partner Name</label>
            <input 
              required
              value={newCharity.name}
              onChange={(e) => setNewCharity({...newCharity, name: e.target.value})}
              className="w-full bg-[#0B0E11] border border-white/5 p-4 rounded-2xl outline-none focus:border-[#84cc16]/50 transition-all text-white"
              placeholder="e.g. Golf for Nature Foundation"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Official Website</label>
            <input 
              required
              type="url"
              value={newCharity.website}
              onChange={(e) => setNewCharity({...newCharity, website: e.target.value})}
              className="w-full bg-[#0B0E11] border border-white/5 p-4 rounded-2xl outline-none focus:border-[#84cc16]/50 transition-all text-white"
              placeholder="https://charity.org"
            />
          </div>
          <div className="space-y-2">
  <label className="text-[10px] font-black uppercase text-gray-500 ml-2 italic tracking-widest">Partner Logo / Banner</label>
  <input 
    type="file" 
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])} // Capture the file object[cite: 14]
    className="w-full bg-[#0B0E11] border border-white/5 p-4 rounded-2xl outline-none focus:border-[#84cc16]/50 text-white"
  />
</div>
          <button 
            disabled={loading}
            className="w-full bg-[#84cc16] text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-[#a3e635] transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : "Confirm Partner Registration"}
          </button>
        </form>
      </Modal>
    </div>
  );
}