import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/logo2.png';
import avatar from '../../assets/images/gadmin.png';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white shadow border-b border-gray-100 flex items-center px-4">
      <div className="flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
            <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
            <img src={avatar} alt="User Avatar" className="h-9 w-9 rounded-full object-cover" />
            <span className="hidden sm:inline text-gray-700 font-medium">{user?.user_metadata?.name || user?.email || 'User'}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Saya</button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
