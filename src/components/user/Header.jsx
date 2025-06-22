import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/logo2.png';
import avatar from '../../assets/images/gadmin.png'; // Ganti dengan avatar default atau dari auth

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white shadow border-b border-gray-100 flex items-center px-4">
      <div className="flex items-center justify-between w-full mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
            <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
          </div>
        </div>

        {/* Right: User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <img src={avatar} alt="User Avatar" className="h-9 w-9 rounded-full object-cover" />
            <span className="hidden sm:inline text-gray-700 font-medium">Leon</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Saya</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Keluar</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
