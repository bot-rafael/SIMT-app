import { useState } from 'react';
import {
  HomeIcon, CalendarDaysIcon, TrophyIcon, AcademicCapIcon,
  Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline';
import logo from '../../assets/images/logo2.png';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', icon: <HomeIcon className="h-5 w-5" />, path: '/dashboard' },
    { name: 'Academy', icon: <AcademicCapIcon className="h-5 w-5" />, path: '/dashboard/academy' },
    { name: 'Challange', icon: <TrophyIcon className="h-5 w-5" />, path: '/dashboard/challange' },
    { name: 'Event', icon: <CalendarDaysIcon className="h-5 w-5" />, path: '/dashboard/event' },
  ];

  const handleClick = (name, path) => {
    setActiveItem(name);
    navigate(path);
  };

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-col w-50 h-screen bg-white shadow-lg border-r border-gray-100 fixed top-0 left-0 z-40">
        <div className="flex items-center justify-start h-20 px-6 space-x-3 shadow border-b border-gray-100">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
            <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map(({ name, icon, path }) => (
            <button
              key={name}
              onClick={() => handleClick(name, path)}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeItem === name ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              {icon}
              <span className="ml-3">{name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between w-full h-16 px-4 bg-white border-b shadow fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EduPro Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-gray-800">EduPro</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 hover:text-blue-600">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-16 left-0 w-64 h-full bg-white shadow-lg border-r border-gray-100 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map(({ name, icon, path }) => (
            <button
              key={name}
              onClick={() => {
                handleClick(name, path);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeItem === name ? 'bg-blue-500 text-white shadow' : 'text-gray-700 hover:bg-blue-100'
              }`}
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
