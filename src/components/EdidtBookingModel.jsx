import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBookingModal = ({ isOpen, onClose, booking, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    trip_from: '',
    trip_to: '',
    no_of_days: '',
    no_of_members: '',
    status: '',
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        name: booking.name || '',
        mobile: booking.mobile || '',
        email: booking.email || '',
        trip_from: booking.trip_from || '',
        trip_to: booking.trip_to || '',
        no_of_days: booking.no_of_days || '',
        no_of_members: booking.no_of_members || '',

        status: booking.status || '',
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested vehicle fields separately
    if (name === 'make' || name === 'model') {
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
      };
      await onSave(booking._id, updatedData);
      toast.success('Booking updated successfully!');
    } catch (error) {
      toast.error('Failed to update booking.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Booking</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trip From
            </label>
            <input
              type="text"
              name="trip_from"
              value={formData.trip_from}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trip To
            </label>
            <input
              type="text"
              name="trip_to"
              value={formData.trip_to}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Days
            </label>
            <input
              type="number"
              name="no_of_days"
              value={formData.no_of_days}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Members
            </label>
            <input
              type="number"
              name="no_of_members"
              value={formData.no_of_members}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
