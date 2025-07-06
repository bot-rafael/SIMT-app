import { Outlet } from 'react-router-dom';
import Navbar from '../components/guest/Navbar';

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col">
      <Navbar />

      <main className="flex w-full flex-col">
        <Outlet />
      </main>
      
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-6 lg:px-10 pt-16 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Logo & Tagline */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-2xl font-bold">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-xl">
                      <span className="text-2xl">📖</span>
                    </div>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      EduPro
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                    "Transforming Education into Careers. Let's build your future together!"
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b-2 border-purple-500 pb-2 inline-block">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-700 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-6 0H3m2-5h12M7 7h4v4H7V7z" />
                      </svg>
                    </div>
                    <div className="text-gray-300">
                      <p className="font-medium text-white">PT Edupro jaya</p>
                      <p>Jl. Patria sari No.1, Rumbai</p>
                      <p>Pekanbaru, Riau 28143</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-700 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-700 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">info@edupro.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Designed with</span>
                  <span className="text-gray-400">by</span>
                  <span className="text-blue-400 font-medium">@ditt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}