import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookings,
  updateBooking,
  deleteBooking,
} from '../features/bookings/bookingsSlice';
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import EditBookingModal from './../components/EdidtBookingModel'; // Corrected import path
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Loader from './Loader';

const BookingTable = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking.bookings); // Access bookings and loading from state
  const { status } = useSelector((state) => state.booking); // Access bookings and loading from state

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Booking to be edited

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Function to handle status toggle
  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'confirmed' : 'pending';
    dispatch(updateBooking({ id, status: newStatus }))
      .then(() => toast.success('Booking status updated successfully!'))
      .catch(() => toast.error('Failed to update booking status.'));
  };

  // Function to handle delete booking
  const handleDelete = (id) => {
    try {
      dispatch(deleteBooking(id));
      toast.success('Booking deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete booking.');
    }
  };

  // Open the edit modal
  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = async (id, updatedData) => {
    try {
      dispatch(updateBooking({ id, ...updatedData }));
      closeEditModal();
    } catch (error) {
      toast.error('Failed to update booking.');
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Bookings
      </h2>
      <div className="overflow-x-auto">
        {status === 'loading' ? (
          <Loader />
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Mobile</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Trip</th>
                <th className="py-3 px-6 text-left">Vehicle</th>
                <th className="py-3 px-6 text-left">Days</th>
                <th className="py-3 px-6 text-left">Members</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {bookings &&
                bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">
                      {booking.vehicle && booking.vehicle.images.length > 0 && (
                        <img
                          src={booking.vehicle && booking.vehicle.images[0]}
                          alt={booking.vehicle && booking.vehicle.make}
                          className="h-16 w-16 object-contain rounded-md"
                        />
                      )}
                    </td>
                    <td className="py-3 px-6">{booking.name}</td>
                    <td className="py-3 px-6">{booking.mobile}</td>
                    <td className="py-3 px-6">{booking.email}</td>
                    <td className="py-3 px-6">
                      {booking.trip_from} - {booking.trip_to}
                    </td>
                    <td className="py-3 px-6">
                      {booking.vehicle && booking.vehicle.make}
                    </td>
                    <td className="py-3 px-6">{booking.no_of_days}</td>
                    <td className="py-3 px-6">{booking.no_of_members}</td>
                    <td className="py-3 px-6">
                      <button
                        className={`px-3 py-1 rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}
                        onClick={() =>
                          handleStatusToggle(booking._id, booking.status)
                        }
                      >
                        {booking.status}
                      </button>
                    </td>
                    <td className="py-3 px-6 relative">
                      <div className="inline-block">
                        <button
                          onClick={() => toggleDropdown(booking._id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaEllipsisV />
                        </button>
                        {activeDropdown === booking._id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                            <button
                              onClick={() => openEditModal(booking)}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(booking._id)}
                              className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        booking={selectedBooking}
        onSave={handleSaveBooking}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default BookingTable;
