import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Guest */
import GuestLayout from './layouts/GuestLayout';
import LandingPage from './pages/guest/LandingPage';
import Login from './pages/guest/Login';
import Register from './pages/guest/Register';

/* User */
import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/user/Dashboard';
import ProfileForm from './pages/user/ProfileForm';

/* Protected Route */
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
          {/* <Route path="academy" element={<Academy />} />
          <Route path="challange" element={<challange />} />
          <Route path="event" element={<event />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
