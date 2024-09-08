import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVehicles,
  updateVehicle,
  deleteVehicle,
} from '../features/vehicles/vehicleSlice'; // Adjust the import path
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import EditVehicleModal from './EditVehicleModel'; // Corrected import path
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Loader from './Loader';

const VehicleTable = () => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => state.vehicles); // Access vehicles and loading from state
  const { status } = useSelector((state) => state.vehicles); // Access status from state

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is active
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Vehicle to be edited

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  // Function to handle delete vehicle
  const handleDelete = (id) => {
    try {
      dispatch(deleteVehicle(id));
      toast.success('Vehicle deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete vehicle.');
    }
  };

  // const handleUpdate = (id) => {
  //   try {
  //     dispatch(updateVehicle(id));
  //     toast.success('Vehicle Updated successfully!');
  //   } catch (error) {
  //     toast.error('Failed to delete vehicle.');
  //   }
  // };

  // Open the edit modal
  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleSaveVehicle = (id, updatedData) => {
    dispatch(updateVehicle({ id, updates: updatedData }))
      .then(() => {
        toast.success('Vehicle updated successfully!');
        closeEditModal();
      })
      .catch(() => toast.error('Failed to update vehicle.'));
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Vehicles
      </h2>
      <div className="overflow-x-auto">
        {status === 'loading' ? (
          <Loader />
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Make</th>
                <th className="py-3 px-6 text-left">Model</th>
                <th className="py-3 px-6 text-left">Year</th>
                <th className="py-3 px-6 text-left">VIN</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-left">Body Type</th>
                <th className="py-3 px-6 text-left">Transmission</th>
                <th className="py-3 px-6 text-left">Fuel Type</th>
                <th className="py-3 px-6 text-left">Daily Rate</th>
                <th className="py-3 px-6 text-left">Availability</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {vehicles &&
                vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.vin}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">
                      {vehicle.images.length > 0 ? (
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.make}
                          className="h-16 w-16 object-contain rounded-md"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-6">{vehicle.make}</td>
                    <td className="py-3 px-6">{vehicle.model}</td>
                    <td className="py-3 px-6">{vehicle.year}</td>
                    <td className="py-3 px-6">{vehicle.vin}</td>
                    <td className="py-3 px-6">{vehicle.color}</td>
                    <td className="py-3 px-6">{vehicle.bodyType}</td>
                    <td className="py-3 px-6">{vehicle.transmission}</td>
                    <td className="py-3 px-6">{vehicle.fuelType}</td>
                    <td className="py-3 px-6">
                      ${vehicle.dailyRate.toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {vehicle.availabilityStatus
                        ? 'Available'
                        : 'Not Available'}
                    </td>
                    <td className="py-3 px-6">{vehicle.description}</td>
                    <td className="py-3 px-6 relative">
                      <div className="inline-block">
                        <button
                          onClick={() => toggleDropdown(vehicle.vin)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaEllipsisV />
                        </button>
                        {activeDropdown === vehicle.vin && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                            <button
                              onClick={() => openEditModal(vehicle)}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(vehicle._id)}
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

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        vehicle={selectedVehicle}
        onSave={handleSaveVehicle}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default VehicleTable;
