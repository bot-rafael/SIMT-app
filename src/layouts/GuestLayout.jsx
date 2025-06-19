import { Outlet } from 'react-router-dom';
import Navbar from '../components/guest/Navbar';

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col">
      <Navbar />
      
      <main className="flex w-full flex-col">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© {new Date().getFullYear()} SIMT App. All rights reserved.</p>
      </footer>
    </div>
  );
}
