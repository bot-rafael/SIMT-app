import { Outlet } from 'react-router-dom';
import Sidebar from '../components/user/Sidebar';
import Header from '../components/user/Header';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (left) */}
      <Sidebar />

      {/* Main content (right) */}
      <div className="flex flex-col flex-1 md:ml-50">
        {/* Top Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-[#2E3338] text-white py-1 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <h2 className="text-lg font-semibold">EduPro</h2>
                <p className="text-xs text-gray-300">Belajar hari ini, karier besok.</p>
              </div>
            </div>

            {/* Office Info */}
            <div className="text-sm text-gray-300 text-center md:text-left">
              <p>PT Cipta Karya Nusantara</p>
              <p>Jl. Jogokaryan No.28C, Mantrijeron, Pekanbaru</p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 text-gray-300 text-xl">
              <a href="#" aria-label="Instagram" className="hover:text-white">
                📸
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white">
                📘
              </a>
              <a href="#" aria-label="X Twitter" className="hover:text-white">
                🐦
              </a>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-gray-600 mt-4 pt-3 text-center text-xs text-gray-400">© {new Date().getFullYear()} EduPro. Design by @ditt.</div>
        </footer>
      </div>
    </div>
  );
}
