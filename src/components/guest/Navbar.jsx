import { useState } from 'react';
import logo from '../../assets/images/logo2.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Beranda');

  const menuItems = ['Beranda', 'Pelatihan', 'Jadwal', 'Kontak'];

  return (
    <nav className="h-20 bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img src={logo} alt="EduPro Logo" className="h-12 w-12 hover:scale-105 transition-transform duration-300" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-800">EduPro</h1>
                <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveItem(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeItem === item ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">Daftar</button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300">Masuk</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              <svg className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveItem(item);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${activeItem === item ? 'bg-blue-500 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
            >
              {item}
            </button>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <button className="w-full px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">Daftar</button>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300">Masuk</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
