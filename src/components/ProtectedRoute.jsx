import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkSessionAndRole = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        setSession(null);
        setLoading(false);
        return;
      }

      setSession(session);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Gagal ambil profile:', profileError.message);
        setLoading(false);
        return;
      }

      setRole(profile?.role || null);
      setLoading(false);
    };

    checkSessionAndRole();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Checking session...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika halaman root, arahkan berdasarkan role
  if (['/', '/dashboard'].includes(location.pathname)) {
    if (role === 'Admin') return <Navigate to="/admin" replace />;
    if (role === 'Pengajar') return <Navigate to="/pengajar" replace />;
    if (role === 'Pelajar') return <Navigate to="/pelajar" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
