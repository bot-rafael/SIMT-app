import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/user/Sidebar';

export default function UserLayout() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        navigate('/login');
        return;
      }

      setUser(user);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile?.role) {
        navigate('/login');
        return;
      }

      setRole(profile.role);
      setLoading(false);
    };

    fetchUserAndRole();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Memuat data pengguna...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      <Sidebar role={role} user={user} />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0 md:ml-64">
        <main className="flex-1 p-4">
          <Outlet context={{ role, user }} />
        </main>

        <footer className="bg-[#2E3338] text-white py-1 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <h2 className="text-lg font-semibold">EduPro</h2>
                <p className="text-xs text-gray-300">Belajar hari ini, karier besok.</p>
              </div>
            </div>
            <div className="text-sm text-gray-300 text-center md:text-left">
              <p>PT Cipta Karya Nusantara</p>
              <p>Jl. Jogokaryan No.28C, Mantrijeron, Pekanbaru</p>
            </div>
            <div className="flex items-center gap-4 text-gray-300 text-xl">
              <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
              <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
              <a href="#" aria-label="Twitter" className="hover:text-white">🐦</a>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-4 pt-3 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} EduPro. Design by @ditt.
          </div>
        </footer>
      </div>
    </div>
  );
}
