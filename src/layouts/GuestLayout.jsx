import { Outlet } from 'react-router-dom';
import Navbar from '../components/guest/Navbar';
import Footer from '../components/guest/Footer';

export default function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-500">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
