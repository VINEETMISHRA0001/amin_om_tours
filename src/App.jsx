// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminChatPage from './pages/AdminChatPage';
import FeedbackPage from './pages/AdminFeedbackPage';
import AdminBookings from './pages/AdminBookings';
import AllBookings from './pages/AllBookingsPage';
import AdminVehicles from './pages/AdminVehicles';
import AllVehicles from './pages/AllVehicles';
import AdminProfilePage from './pages/AdminProfile';
// import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/chats"
          element={<ProtectedRoute element={<AdminChatPage />} />}
        />
        <Route
          path="/feedbacks"
          element={<ProtectedRoute element={<FeedbackPage />} />}
        />
        <Route
          path="/bookings"
          element={<ProtectedRoute element={<AdminBookings />} />}
        />
        <Route
          path="/all-bookings"
          element={<ProtectedRoute element={<AllBookings />} />}
        />
        <Route
          path="/vehicles"
          element={<ProtectedRoute element={<AdminVehicles />} />}
        />
        <Route
          path="/all-vehicles"
          element={<ProtectedRoute element={<AllVehicles />} />}
        />
        <Route
          path="/my-profile"
          element={<ProtectedRoute element={<AdminProfilePage />} />}
        />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
