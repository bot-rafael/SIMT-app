import { HomeIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';
import avatar from '../../assets/images/gadmin.png';
import { supabase } from '../../supabaseClient';

export default function Sidebar({ role, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  const menuByRole = {
    Admin: [
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/admin' },
      { name: 'Users', icon: <HomeIcon className="h-5 w-5" />, path: '/admin/users' },
      { name: 'Pelatihan', icon: <HomeIcon className="h-5 w-5" />, path: '/admin/pelatihan' },
      { name: 'Pengumuman', icon: <HomeIcon className="h-5 w-5" />, path: '/admin/pengumuman' },
    ],
    Pengajar: [
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/pengajar' },
      { name: 'Pelatihan', icon: <HomeIcon className="h-5 w-5" />, path: '/pengajar/pelatihan' },
      { name: 'Tugas', icon: <HomeIcon className="h-5 w-5" />, path: '/pengajar/tugas' },
    ],
    Pelajar: [
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar' },
      { name: 'Profile', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar/profile' },
      { name: 'Pelatihan', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar/pelatihan' },
      { name: 'Tugas', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar/tugas' },
      { name: 'Riwayat', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar/riwayat' },
      { name: 'Sertifikat', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar/sertifikat' },
    ],
  };

  const activeMenus = menuByRole[role] || [];

  const handleClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Menutup dropdown saat klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!role) return null;

  return (
    <div className="relative z-50">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex md:flex-col w-64 h-screen bg-white shadow-lg border-r border-gray-100 fixed top-0 left-0 z-40">
        <div className="flex items-center h-20 px-6 space-x-3 border-b border-gray-100">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
            <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
          </div>
        </div>

        {/* Profile */}
        <div className="px-4 py-3 border-b border-gray-100 relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
            <img src={avatar} alt="User" className="h-8 w-8 rounded-full" />
            <div className="flex-1 text-left text-sm text-gray-700 font-medium truncate">{user?.user_metadata?.name || user?.email || 'User'}</div>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 transition-all">
                Keluar
              </button>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {activeMenus.map(({ name, icon, path }) => (
            <button
              key={name}
              onClick={() => handleClick(path)}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === path ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-100'}`}
            >
              {icon}
              <span className="ml-3">{name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b shadow z-[60] flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 hover:text-blue-600">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-16 left-0 w-64 h-full bg-white shadow-lg border-r transform transition-transform duration-300 z-[55] ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <nav className="px-4 py-6 space-y-2">
          {activeMenus.map(({ name, icon, path }) => (
            <button
              key={name}
              onClick={() => handleClick(path)}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === path ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-100'}`}
            >
              {icon}
              <span className="ml-3">{name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
