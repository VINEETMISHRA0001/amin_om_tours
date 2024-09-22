import { useState } from 'react';
import {
  BiCalendar,
  BiCar,
  BiChat,
  BiCog,
  BiNotepad,
  BiSolidTree,
} from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { FaCar, FaHome, FaUmbrellaBeach } from 'react-icons/fa';
import { FcFeedback } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-gray-900 text-gray-100 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <BiCar
            className="h-7 w-7 text-green-500 cursor-pointer"
            onClick={toggleSidebar}
          />
          {!isCollapsed && (
            <span className="text-2xl font-bold ml-3">Admin</span>
          )}

          <BiSolidTree
            className="h-7 w-7 ml-3- text-green-500 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-10">
        <ul className="space-y-3">
          {/* Dashboard Link */}
          <li>
            <Link
              to="/"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <FaHome className="h-6 w-6 text-blue-400" />
              {!isCollapsed && <span className="ml-4">Dashboard</span>}
            </Link>
          </li>

          {/* Chats Link */}
          <li>
            <Link
              to="/chats"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <BiChat className="h-6 w-6 text-green-400" />
              {!isCollapsed && <span className="ml-4">Chats</span>}
            </Link>
          </li>

          {/* Feedback Link */}
          <li>
            <Link
              to="/feedbacks"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <FcFeedback className="h-6 w-6" />
              {!isCollapsed && <span className="ml-4">Feedback</span>}
            </Link>
          </li>

          {/* Bookings Link */}
          <li>
            <Link
              to="/bookings"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <BiCalendar className="h-6 w-6 text-red-400" />
              {!isCollapsed && <span className="ml-4">Create Booking</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/all-bookings"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <BiNotepad className="h-6 w-6 text-yellow-400" />
              {!isCollapsed && <span className="ml-4">All Bookings</span>}
            </Link>
          </li>

          {/* Vehicles Link */}
          <li>
            <Link
              to="/vehicles"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <BsCardImage className="h-6 w-6 text-purple-400" />
              {!isCollapsed && <span className="ml-4">Create New Vehicle</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/all-vehicles"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <FaCar className="h-6 w-6 text-white" />
              {!isCollapsed && <span className="ml-4">View All Cars</span>}
            </Link>
          </li>

          {/* Settings Link */}
          <li>
            <Link
              to="/my-profile"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <BiCog className="h-6 w-6 text-teal-400" />
              {!isCollapsed && <span className="ml-4">Settings</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/tours"
              className="flex items-center p-3 rounded-md hover:bg-gray-800 transition duration-200"
            >
              <FaUmbrellaBeach className="h-6 w-6 text-red-400" />
              {!isCollapsed && <span className="ml-4">Tours</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
