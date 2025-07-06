import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo2.png';

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Kursus', href: '#' },
    { name: 'Tentang Kami', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Karir', href: '#' },
  ];

  const services = [
    { name: 'Pembelajaran Online', href: '#' },
    { name: 'Sertifikasi', href: '#' },
    { name: 'Mentorship', href: '#' },
    { name: 'Corporate Training', href: '#' },
    { name: 'Webinar', href: '#' },
  ];

  return (
    <footer className="bg-blue-900 text-white relative overflow-hidden">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-6 lg:px-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

            {/* Logo & Description */}
            <div className="lg:col-span-2 space-y-8">
              <div 
                className="space-y-6 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center group">
                  <div className="flex-shrink-0 flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={logo}
                        alt="EduPro Logo"
                        className="h-16 w-16 relative z-10 hover:scale-110 transition-transform duration-300 rounded-2xl"
                      />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                        EduPro
                      </h1>
                      <p className="text-blue-200 text-sm font-medium -mt-1 animate-pulse">
                        Platform Pembelajaran Masa Depan
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Mengubah dunia pendidikan melalui teknologi inovatif. Memberdayakan pembelajar di seluruh dunia dengan solusi edukasi yang canggih dan modern.
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span>1M+ Pengguna Aktif</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                      <span>500+ Kursus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Tautan Cepat
                <div className="absolute -bottom-2 left-8 w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 hover:text-blue-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></span>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Layanan
                <div className="absolute -bottom-2 left-8 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </h3>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 hover:text-purple-300 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></span>
                      {service.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative flex items-center gap-2">
                <span className="text-2xl">📞</span>
                Kontak
                <div className="absolute -bottom-2 left-8 w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              </h3>
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-xl">🏢</span>
                    </div>
                    <div className="text-gray-300">
                      <p className="font-semibold text-white text-lg">PT Edupro Jaya</p>
                      <p className="text-sm">Jl. Patria Sari No.1, Rumbai</p>
                      <p className="text-sm">Pekanbaru, Riau 28143</p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">+62 812-3456-7890</p>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Layanan 24/7
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">info@edupro.com</p>
                      <p className="text-gray-400 text-sm">Respon dalam 1 jam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-700/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-400"></div>
                </div>
                <span className="text-gray-400">© 2024 EduPro. Hak cipta dilindungi undang-undang.</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Didesain dengan</span>
                <span className="text-red-400">Laptop LOQ</span>
                <span className="text-gray-400">oleh</span>
                <span className="text-blue-400">@ditt </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}