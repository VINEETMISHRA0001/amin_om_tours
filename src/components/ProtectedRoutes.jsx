import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth); // Only check token for authentication
  const location = useLocation();

  // Redirect to login page if not authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home page if authenticated and trying to access login page
  if (token && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  // Render the protected route if authenticated
  return element;
};

export default ProtectedRoute;
