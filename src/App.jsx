import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Guest */
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
import Dashboard from './pages/user/Dashboard';
import ProfileForm from './pages/user/ProfileForm';

/* Protected Route */
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
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

        {/* User Routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
