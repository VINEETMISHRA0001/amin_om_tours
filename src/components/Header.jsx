import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { logoutUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { persistor } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // No need to parse the user object as it's already an object
  // const userObject = JSON.parse(user); // This line is unnecessary

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear user from Redux store
    persistor.purge();
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex sticky top-0 left-0 items-center justify-between p-4 bg-gray-900 text-white shadow-md border-b border-gray-700">
      <div className="flex items-center space-x-6">
        <button className="p-2 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out">
          <FaSearch className="h-6 w-6" />
        </button>
        <button className="relative p-2 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out">
          <FaBell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out"
        >
          <FaUserCircle className="h-8 w-8" />
          <span className="hidden md:inline">
            {user ? `${user.name.toUpperCase()}` : 'Guest'}
          </span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 w-auto mt-2 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-300">
            <a
              href="#profile"
              className="block px-4 py-2 border-b bg-blue-100 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              {user && user.email}
            </a>
            <a
              href="#settings"
              className="block px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Settings
            </a>
            <Link
              onClick={handleLogout}
              to="/login"
              className="block px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
