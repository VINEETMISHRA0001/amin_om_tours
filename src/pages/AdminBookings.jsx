import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Booking from '../components/Booking';

const AdminBookings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="ml-64">
        <Header />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 bg-gray-100">
          <Booking />
        </main>
      </div>
    </div>
  );
};

export default AdminBookings;
