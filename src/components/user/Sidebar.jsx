import { 
  HomeIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  UserGroupIcon,
  AcademicCapIcon,
  SpeakerWaveIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
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
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/admin', color: 'text-sky-500' },
      { name: 'Users', icon: <UserGroupIcon className="h-5 w-5" />, path: '/admin/users', color: 'text-blue-500' },
      { name: 'Pelatihan', icon: <AcademicCapIcon className="h-5 w-5" />, path: '/admin/pelatihan', color: 'text-cyan-500' },
      { name: 'Pengumuman', icon: <SpeakerWaveIcon className="h-5 w-5" />, path: '/admin/pengumuman', color: 'text-indigo-500' },
    ],
    Pengajar: [
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/pengajar', color: 'text-sky-500' },
      { name: 'Pelatihan', icon: <AcademicCapIcon className="h-5 w-5" />, path: '/pengajar/pelatihan', color: 'text-blue-500' },
      { name: 'Tugas', icon: <ClipboardDocumentListIcon className="h-5 w-5" />, path: '/pengajar/tugas', color: 'text-cyan-500' },
    ],
    Pelajar: [
      { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/pelajar', color: 'text-sky-500' },
      { name: 'Profile', icon: <UserIcon className="h-5 w-5" />, path: '/pelajar/profile', color: 'text-blue-500' },
      { name: 'Pelatihan', icon: <AcademicCapIcon className="h-5 w-5" />, path: '/pelajar/pelatihan', color: 'text-cyan-500' },
      { name: 'Tugas', icon: <ClipboardDocumentListIcon className="h-5 w-5" />, path: '/pelajar/tugas', color: 'text-indigo-500' },
      { name: 'Riwayat', icon: <ClockIcon className="h-5 w-5" />, path: '/pelajar/riwayat', color: 'text-emerald-500' },
      { name: 'Sertifikat', icon: <DocumentTextIcon className="h-5 w-5" />, path: '/pelajar/sertifikat', color: 'text-purple-500' },
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
      <div className="hidden md:flex md:flex-col w-72 h-screen bg-gradient-to-b from-white via-sky-50/30 to-blue-50/50 shadow-2xl border-r border-sky-200/50 fixed top-0 left-0 z-40 backdrop-blur-sm">
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 space-x-3 border-b border-sky-200/30 bg-white/80 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl blur opacity-20"></div>
            <img src={logo} alt="EduPro Logo" className="relative h-12 w-12 rounded-xl shadow-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              EduPro
            </h1>
            <p className="text-xs text-sky-600 font-medium -mt-1">Learning Platform</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-4 border-b border-sky-200/30 relative bg-white/50" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-100/80 to-blue-100/80 hover:from-sky-200/80 hover:to-blue-200/80 transition-all duration-300 shadow-sm border border-sky-200/30 backdrop-blur-sm"
          >
            <div className="relative">
              <img src={avatar} alt="User" className="h-10 w-10 rounded-full shadow-md border-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-sky-800 truncate">
                {user?.user_metadata?.name || user?.email || 'User'}
              </div>
              <div className="text-xs text-sky-600 capitalize font-medium">{role}</div>
            </div>
            <ChevronDownIcon className={`h-4 w-4 text-sky-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-6 right-6 mt-2 bg-white/95 backdrop-blur-md border border-sky-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-2">
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-4 px-4">
            Menu {role}
          </div>
          
          {activeMenus.map(({ name, icon, path, color }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={name}
                onClick={() => handleClick(path)}
                className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200/50 transform scale-105' 
                    : 'text-sky-700 hover:bg-sky-100/80 hover:text-sky-800 hover:shadow-md hover:transform hover:scale-102'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-2xl blur-sm"></div>
                )}
                
                <div className={`relative ${isActive ? 'text-white' : color} group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>
                <span className="relative ml-3 font-medium">{name}</span>
                
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sky-200/30 bg-white/30">
          <div className="text-center">
            <div className="text-xs text-sky-600 font-medium">EduPro Platform</div>
            <div className="text-xs text-sky-500">v2.0.1</div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg z-[60] flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EduPro Logo" className="h-8 w-8 rounded-lg shadow-md" />
          <h1 className="text-xl font-bold text-white">EduPro</h1>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-white hover:bg-white/20 rounded-xl transition-all duration-200"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-16 left-0 w-80 h-full bg-gradient-to-b from-white via-sky-50/50 to-blue-50/50 shadow-2xl border-r border-sky-200/50 transform transition-transform duration-500 ease-out z-[55] ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden backdrop-blur-sm`}>
        
        {/* Mobile Profile */}
        <div className="px-6 py-4 border-b border-sky-200/30 bg-white/80">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-sky-50/80">
            <img src={avatar} alt="User" className="h-10 w-10 rounded-full shadow-md border-2 border-white" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-sky-800 truncate">
                {user?.user_metadata?.name || user?.email || 'User'}
              </div>
              <div className="text-xs text-sky-600 capitalize font-medium">{role}</div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="px-6 py-4 space-y-2 flex-1">
          <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-4 px-4">
            Menu {role}
          </div>
          
          {activeMenus.map(({ name, icon, path, color }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={name}
                onClick={() => handleClick(path)}
                className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg' 
                    : 'text-sky-700 hover:bg-sky-100/80 hover:text-sky-800'
                }`}
              >
                <div className={`${isActive ? 'text-white' : color} group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>
                <span className="ml-3 font-medium">{name}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Logout */}
        <div className="px-6 py-4 border-t border-sky-200/30 bg-white/50">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-2xl transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[54] md:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}