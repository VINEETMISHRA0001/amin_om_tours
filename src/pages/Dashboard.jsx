// src/components/Dashboard.js
import Sidebar from './../components/Sidebar';
import Header from './../components/Header';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../features/contact/contactSlice';
import { fetchFeedbacks } from '../features/feedbacks/feedbackSlice';
import { fetchPayments } from '../features/payments/paymentSlice';
import { Link } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import { fetchBookings } from '../features/bookings/bookingsSlice';
import { fetchVehicles } from '../features/vehicles/vehicleSlice';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Sample data for charts
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 4500, 3000, 5000, 6000, 7000, 8000],
      borderColor: 'rgba(34,197,94,1)',
      backgroundColor: 'rgba(34,197,94,0.2)',
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
      },
    },
  },
};

// Sample data for the table
const bookingsData = [
  {
    id: 1,
    customer: 'John Doe',
    car: 'Toyota Camry',
    date: '2024-04-01',
    status: 'Confirmed',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    car: 'Honda Accord',
    date: '2024-04-03',
    status: 'Returned',
  },
  {
    id: 3,
    customer: 'Alice Johnson',
    car: 'BMW X5',
    date: '2024-04-05',
    status: 'Canceled',
  },
  // Add more data as needed
];

// Sample data for available cars
const availableCars = [
  {
    id: 1,
    name: 'Toyota Camry',
    brand: 'Toyota',
    pricePerDay: 70,
    imageUrl:
      'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Honda Accord',
    brand: 'Honda',
    pricePerDay: 65,
    imageUrl:
      'https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80', // Replace with actual image URL
  },
  {
    id: 3,
    name: 'BMW X5',
    brand: 'BMW',
    pricePerDay: 120,
    imageUrl:
      'https://s7ap1.scene7.com/is/image/tatamotors/sunlit-yellow-left?$VH-708-500-D$&fit=crop&fmt=webp-alpha', // Replace with actual image URL
  },

  {
    id: 4,
    name: 'Honda Accord',
    brand: 'Honda',
    pricePerDay: 65,
    imageUrl:
      'https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80', // Replace with actual image URL
  },
  // Add more cars as needed
];

// Sample data for recent chats
const recentChats = [
  {
    id: 1,
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    name: 'Michael Brown',
    message: 'Just wanted to check the status of my booking.',
  },
  {
    id: 2,
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    name: 'Sarah Johnson',
    message: 'Can I modify my booking details?',
  },
  {
    id: 3,
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    name: 'David Smith',
    message: 'Looking for recommendations for my next car rental.',
  },
  // Add more chat data as needed
];

// Sample data for feedback, chats, and reviews

const Dashboard = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contact);
  const { feedbacks } = useSelector((state) => state.feedbacks.feedbacks);
  const { bookings } = useSelector((state) => state.booking.bookings);
  const { totalProfit } = useSelector((state) => state.payments.payments);
  const { vehicles } = useSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchFeedbacks());
    dispatch(fetchPayments());
    dispatch(fetchBookings());
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar - Fixed on the left */}
      <aside className="w-64 bg-white shadow-lg sticky h-full">
        <Sidebar />
      </aside>

      {/* Main Content - Adjusted for the fixed sidebar */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-50 flex flex-col lg:flex-row">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-6">
            {/* Dashboard Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
              Welcome Back, Admin
            </h1>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Total Revenue */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-700">
                  Total Revenue
                </h2>
                <p className="mt-4 text-3xl font-bold text-green-600">
                  ₹{totalProfit && totalProfit}
                </p>
                <p className="text-sm text-gray-500 mt-2">Since last month</p>
              </div>

              {/* Card 2: Total Bookings */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-700">
                  Total Bookings
                </h2>
                <p className="mt-4 text-3xl font-bold text-blue-600">
                  {bookings && bookings.length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Since last month</p>
              </div>

              {/* Card 3: Active Cars */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-gray-700">
                  Active Cars
                </h2>
                <p className="mt-4 text-3xl font-bold text-purple-600">
                  {vehicles && vehicles.length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Currently in use</p>
              </div>
            </div>

            {/* Performance Overview Section */}
            <div className="mt-8">
              {/* Graph */}
              <div className="bg-white h-[30%] border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Available Cars Section */}
            <div className="mt-8 py-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vehicles &&
                  vehicles.slice(0, 8).map((car) => (
                    <div
                      key={car._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                      <img
                        src={car.images[0]}
                        alt={car.make}
                        className="w-full h-32 object-contain"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {car.make}
                        </h3>
                        <p className="text-sm text-gray-600">{car.model}</p>
                      </div>
                    </div>
                  ))}

                <div className="p-4">
                  <Link
                    to="/all-vehicles" // Ensure this links to the correct path or page
                    className="text-lg flex flex-row gap-4 items-center font-bold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    See More <FaChevronCircleRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Data Table Section */}
            <div className="mt-8 w-[100%]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Bookings Details
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Car
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings &&
                      bookings.slice(0, 5).map((booking, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.vehicle?.make} {booking.vehicle?.model}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.created_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'Returned'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                    <div className="p-4">
                      <Link
                        to="/all-bookings" // Ensure this links to the correct path or page
                        className="text-lg flex flex-row gap-4 items-center font-bold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      >
                        See More <FaChevronCircleRight />
                      </Link>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Chats and Additional Sections */}
          <div className="lg:w-96 lg:ml-6 mt-8 lg:mt-0">
            {/* Total Feedback */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Feedback
              </h2>
              <p className="mt-4 text-3xl font-bold text-yellow-600">
                {feedbacks && feedbacks.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Received this month</p>
            </div>

            {/* Total Chats */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Chats
              </h2>
              <p className="mt-4 text-3xl font-bold text-blue-600">
                {contacts && contacts.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Active chats</p>
            </div>

            {/* Total Reviews */}

            {/* Recent Chats */}
            <div>
              <h2 className="text-2xl mt-3 font-semibold text-gray-800 mb-4">
                Recent Chats
              </h2>
              <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                {contacts &&
                  contacts.slice(0, 5).map((chat) => (
                    <div
                      key={chat._id}
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-300 ease-in-out"
                    >
                      <img
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                        alt="avatar image"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {chat.email}
                        </p>
                        <p className="text-sm text-gray-600">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                <div className="p-4 flex justify-center">
                  <Link
                    to="/chats" // Ensure this links to the correct path or page
                    className="text-lg flex flex-row gap-4 items-center font-bold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    See More <FaChevronCircleRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
