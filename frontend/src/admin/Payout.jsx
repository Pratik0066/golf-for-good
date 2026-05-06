// admin/Payout.jsx
import { useState } from "react";
import API from "../api/axios";
import AdminLayout from "./AdminLayout";

export default function Payout() {
  const [data, setData] = useState({});

  const sendPayout = async () => {
    await API.post("/admin/payout", data);
    alert("Payout done");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-4">Payout</h1>

      <input
        placeholder="User ID"
        onChange={(e)=>setData({...data,userId:e.target.value})}
      />

      <input
        placeholder="Amount"
        onChange={(e)=>setData({...data,amount:e.target.value})}
      />

      <button onClick={sendPayout} className="bg-primary p-2 mt-3">
        Send Payout
      </button>
    </AdminLayout>
  );
}