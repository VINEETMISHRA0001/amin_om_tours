import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { createVehicle } from './../features/vehicles/vehicleSlice';
import { toast } from 'react-toastify';

const CreateVehicleForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
    bodyType: '',
    transmission: '',
    fuelType: '',
    dailyRate: '',
    availabilityStatus: true,
    description: '',
    images: [''],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (index, e) => {
    const { value } = e.target;
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createVehicle(formData))
      .then(() => {
        toast.success('Vehicle created successfully!');
        setFormData({
          make: '',
          model: '',
          year: '',
          vin: '',
          color: '',
          bodyType: '',
          transmission: '',
          fuelType: '',
          dailyRate: '',
          availabilityStatus: true,
          description: '',
          images: [''],
        });
      })
      .catch((error) => {
        toast.error('Failed to create vehicle.');
        console.error('Error creating vehicle:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-xl rounded-lg">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Create New Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'make', label: 'Make' },
            { name: 'model', label: 'Model' },
            { name: 'year', label: 'Year', type: 'number' },
            { name: 'vin', label: 'VIN' },
            { name: 'color', label: 'Color' },
            { name: 'bodyType', label: 'Body Type' },
            { name: 'transmission', label: 'Transmission' },
            { name: 'fuelType', label: 'Fuel Type' },
            { name: 'dailyRate', label: 'Daily Rate', type: 'number' },
            { name: 'description', label: 'Description', type: 'textarea' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name} className="mb-4">
              <label className="block text-lg font-semibold text-gray-800 mb-1">
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out p-2"
                  rows="4"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out p-2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-1">
            Availability Status
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availabilityStatus"
              checked={formData.availabilityStatus}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-3 text-gray-600">Available</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-1">
            Images
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e)}
                className="flex-1 block border border-gray-300 rounded-lg shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out p-2"
                placeholder="Image URL"
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
              >
                <FaTrashAlt className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-indigo-500 hover:text-indigo-700 transition duration-150 ease-in-out"
          >
            Add Another Image
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Create Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVehicleForm;
