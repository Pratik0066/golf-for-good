// admin/Users.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../layout/Layout";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    API.get("/admin/users").then(res=>setUsers(res.data));
  },[]);

  return (
    <Layout>
      <h1>Users</h1>

      {users.map(u=>(
        <div key={u._id}>
          {u.email} - ₹{u.winnings}
        </div>
      ))}
    </Layout>
  );
}