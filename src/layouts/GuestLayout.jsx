import { Outlet } from 'react-router-dom';
import Navbar from '../components/guest/Navbar';

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col">
      <Navbar />

      <main className="flex w-full flex-col">
        <Outlet />
      </main>
      <footer className="bg-[#2E3338] text-white px-10 pt-12 pb-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Logo & Social */}
          <div className="flex flex-col gap-4">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-2 text-xl font-semibold">
              <span className="text-2xl">📖</span>
              <span>EduPro</span>
            </div>
            <p className="text-sm max-w-sm">"Transforming Education into Careers. Let's build your future together!"</p>

            {/* Social Media */}
            <div>
              <p className="font-medium mb-2">Social Media</p>
              <div className="flex gap-3 text-xl">
                <a href="#" aria-label="Instagram">
                  {/* icons */}
                </a>
                <a href="#" aria-label="Facebook">
                  {/* icons */}
                </a>
                <a href="#" aria-label="X Twitter">
                  {/* icons */}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Office */}
          <div>
            <p className="font-medium mb-2">Office</p>
            <p>PT Cipta Karya Nusantara</p>
            <p>Jl. Jogokaryan No.28C, Mantrijeron</p>
            <p>Pekanbaru, Riau 28143</p>
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-400">Desain By @ditt</div>
      </footer>
    </div>
  );
}
