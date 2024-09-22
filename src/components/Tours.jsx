// src/pages/AdminTourPage.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTours, addTour, deleteTour } from '../features/tours/tourSlice';

const AdminTourPage = () => {
  const dispatch = useDispatch();
  const { tours, status, error } = useSelector((state) => state.tour);

  const [formData, setFormData] = useState({
    duration: '',
    destinations: '',
    price: '',
    trip_overview: '',
    trip_highlights: '',
    itinerary: '',
    images: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tourData = {
      ...formData,
      destinations: formData.destinations.split(',').map((item) => item.trim()),
      trip_highlights: formData.trip_highlights
        .split(',')
        .map((item) => item.trim()),
      itinerary: formData.itinerary.split('\n').map((item, index) => {
        const parts = item.split('-');
        return {
          day: index + 1,
          location: parts[0] ? parts[0].trim() : '', // Handle undefined
          description: parts[1] ? parts[1].trim() : '', // Handle undefined
        };
      }),
      images: formData.images.split(',').map((item) => item.trim()),
    };
    dispatch(addTour(tourData));
    setFormData({
      duration: '',
      destinations: '',
      price: '',
      trip_overview: '',
      trip_highlights: '',
      itinerary: '',
      images: '',
    });
  };

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Admin Tour Packages
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration (Days)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Destinations (comma separated)
          </label>
          <input
            type="text"
            name="destinations"
            value={formData.destinations}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Trip Overview
          </label>
          <textarea
            name="trip_overview"
            value={formData.trip_overview}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Trip Highlights (comma separated)
          </label>
          <textarea
            name="trip_highlights"
            value={formData.trip_highlights}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Itinerary (Day-Location:Description, newline for each)
          </label>
          <textarea
            name="itinerary"
            value={formData.itinerary}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images (comma separated URLs)
          </label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Tour
        </button>
      </form>

      <div className="bg-white shadow-md rounded p-8">
        <h2 className="text-2xl mb-6">Existing Tours</h2>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'failed' ? (
          <p>{error}</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Destinations</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour._id}>
                  <td className="border px-4 py-2">{tour.duration}</td>
                  <td className="border px-4 py-2">
                    {tour.destinations.join(', ')}
                  </td>
                  <td className="border px-4 py-2">${tour.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => dispatch(deleteTour(tour._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTourPage;
