import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Guest */
import GuestLayout from './layouts/GuestLayout';
import LandingPage from './pages/guest/LandingPage';
// import Login from './pages/guest/Login'; // contoh nanti kalau kamu mau login

/* User */
import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/user/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<LandingPage />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Route>

        {/* User Routes */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          {/* Tambahkan route lain kalau ada, seperti: */}
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
