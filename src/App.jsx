import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Layouts */
import GuestLayout from './layouts/GuestLayout';
import LandingPage from './pages/guest/LandingPage';
import Login from './pages/guest/Login';
import Register from './pages/guest/Register';
import CourseDetailPage from './pages/guest/CourseDetailPage';
import CourseDetailPage2 from './pages/guest/CourseDetailPage2';
import CourseDetailPage3 from './pages/guest/CourseDetailPage3';
import ScrollToTop from './components/guest/ScrollToTop';

/* User */
import UserLayout from './layouts/UserLayout';

/* Protected */
import ProtectedRoute from './components/ProtectedRoute';

/* Lazy Load - Guest */
const LandingPage = React.lazy(() => import('./pages/guest/LandingPage'));
const Login = React.lazy(() => import('./pages/guest/Login'));
const Register = React.lazy(() => import('./pages/guest/Register'));

/* Lazy Load - Admin */
const DashboardAdmin = React.lazy(() => import('./pages/user/admin/Dashboard'));
const PelatihanAdmin = React.lazy(() => import('./pages/user/admin/Pelatihan'));
const PengumumanAdmin = React.lazy(() => import('./pages/user/admin/Pengumuman'));
const Users = React.lazy(() => import('./pages/user/admin/Users'));

/* Lazy Load - Pengajar */
const DashboardPengajar = React.lazy(() => import('./pages/user/teacher/Dashboard'));
const PelatihanPengajar = React.lazy(() => import('./pages/user/teacher/Pelatihan'));
const TugasPengajar = React.lazy(() => import('./pages/user/teacher/Tugas'));

/* Lazy Load - Pelajar */
const DashboardPelajar = React.lazy(() => import('./pages/user/student/Dashboard'));
const PelatihanPelajar = React.lazy(() => import('./pages/user/student/Pelatihan'));
const ProfilePelajar = React.lazy(() => import('./pages/user/student/Profile'));
const RiwayatPelajar = React.lazy(() => import('./pages/user/student/Riwayat'));
const SertifikatPelajar = React.lazy(() => import('./pages/user/student/Sertifikat'));
const TugasPelajar = React.lazy(() => import('./pages/user/student/Tugas'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="detail/kepemimpinan" element={<CourseDetailPage />} />
            <Route path="detail/komunikasi" element={<CourseDetailPage2 />} />
            <Route path="detail/analisis-data" element={<CourseDetailPage3 />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardAdmin />} />
            <Route path="pelatihan" element={<PelatihanAdmin />} />
            <Route path="pengumuman" element={<PengumumanAdmin />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Pengajar Routes */}
          <Route
            path="/pengajar"
            element={
              <ProtectedRoute role="Pengajar">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPengajar />} />
            <Route path="pelatihan" element={<PelatihanPengajar />} />
            <Route path="tugas" element={<TugasPengajar />} />
          </Route>

          {/* Pelajar Routes */}
          <Route
            path="/pelajar"
            element={
              <ProtectedRoute role="Pelajar">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPelajar />} />
            <Route path="pelatihan" element={<PelatihanPelajar />} />
            <Route path="profile" element={<ProfilePelajar />} />
            <Route path="riwayat" element={<RiwayatPelajar />} />
            <Route path="sertifikat" element={<SertifikatPelajar />} />
            <Route path="tugas" element={<TugasPelajar />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
