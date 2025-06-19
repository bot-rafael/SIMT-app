import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestLayout from './layouts/GuestLayout';
import LandingPage from './pages/guest/LandingPage';
// import Login from './pages/guest/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Route */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<LandingPage />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Route>

        {/* Contoh admin route (kalau nanti kamu pakai layout admin) */}
        {/*
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
