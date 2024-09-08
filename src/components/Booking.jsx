import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from './../features/bookings/bookingsSlice';
import { fetchVehicles } from './../features/vehicles/vehicleSlice';
import { ToastContainer, toast } from 'react-toastify';

const Booking = () => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => state.vehicles);
  const { status, error } = useSelector((state) => state.booking);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    no_of_members: '',
    trip_from: '',
    trip_to: '',
    no_of_days: '',
    professional_details: '',
    vehicleId: '',
    proof_document: null,
    special_requirements: '',
    total_booking_price: '',
    status: 'pending',
  });

  const [pdfPreview, setPdfPreview] = useState('');

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'proof_document') {
      if (files[0] && files[0].type === 'application/pdf') {
        setPdfPreview(URL.createObjectURL(files[0]));
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      } else {
        alert('Please upload a valid PDF file.');
        setPdfPreview('');
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { proof_document, ...rest } = formData;

    // Convert the file to base64 (if needed, and if your backend supports it)
    let proofDocumentBase64 = null;
    if (proof_document) {
      const reader = new FileReader();
      reader.readAsDataURL(proof_document);
      reader.onloadend = async () => {
        proofDocumentBase64 = reader.result;

        // Create a JSON object excluding the file
        const jsonData = {
          ...rest,
          proof_document: proofDocumentBase64,
        };

        try {
          // Dispatch the action to create booking
          dispatch(createBooking(jsonData));
          toast.success('Booking successful!');
        } catch (err) {
          console.error('Booking creation failed:', err);
          toast.error('Booking failed. Please try again.');
        }
      };
    } else {
      // Create a JSON object excluding the file
      const jsonData = {
        ...rest,
        proof_document: null,
      };

      try {
        // Dispatch the action to create booking
        dispatch(createBooking(jsonData));
        toast.success('Booking successful!');
      } catch (err) {
        console.error('Booking creation failed:', err);
        toast.error('Booking failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Booking Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Fields */}
            {[
              'name',
              'mobile',
              'email',
              'no_of_members',
              'trip_from',
              'trip_to',
              'no_of_days',
              'professional_details',
              'special_requirements',
              'total_booking_price',
            ].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  {field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                {field === 'professional_details' ||
                field === 'special_requirements' ? (
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, ' $1')
                      .toLowerCase()}`}
                    rows="3"
                    required
                  />
                ) : (
                  <input
                    type={
                      field === 'email'
                        ? 'email'
                        : field === 'mobile'
                        ? 'tel'
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, ' $1')
                      .toLowerCase()}`}
                    required
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Vehicle
              </label>
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                required
              >
                <option value="">Select vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Book Now'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;
