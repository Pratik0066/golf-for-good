// admin/Charity.jsx
import AdminLayout from "./AdminLayout";

export default function Charity() {
  return (
    <AdminLayout>
      <h1 className="text-2xl mb-4">Create Charity</h1>

      <div className="card p-5 max-w-md">
        <input className="w-full p-2 mb-3 bg-transparent border border-white/10 rounded" placeholder="Name" />
        <textarea className="w-full p-2 mb-3 bg-transparent border border-white/10 rounded" placeholder="Description" />

        <button className="bg-primary px-4 py-2 rounded">
          Save
        </button>
      </div>
    </AdminLayout>
  );
}