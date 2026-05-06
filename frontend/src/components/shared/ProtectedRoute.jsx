import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Critical: Wait for useEffect in AuthContext

  // If user is null, it blocks. If user exists, it shows the dashboard.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}