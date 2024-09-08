import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaDumpster, FaRegEdit, FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import star icons
import Loader from '../components/Loader';
import {
  deleteFeedback,
  fetchFeedbacks,
} from '../features/feedbacks/feedbackSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditFeedbackModal from './EditFeedbackModel';

const FeedbacksTable = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector(
    (state) => state.feedbacks.feedbacks // Access feedbacks correctly
  );
  const { loading, error } = useSelector(
    (state) => state.feedbacks // Access feedbacks correctly
  );

  const [editFeedback, setEditFeedback] = useState(null); // Edit feedback state

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this feedback?'
    );
    if (confirmDelete) {
      dispatch(deleteFeedback(id))
        .then(() =>
          toast.success('Feedback deleted successfully!', { autoClose: 2000 })
        )
        .catch((error) =>
          toast.error(`Error: ${error.message}`, { autoClose: 3000 })
        );
    }
  };

  const handleEdit = (feedback) => {
    setEditFeedback(feedback); // Set feedback to edit and open modal
  };

  // Function to render dynamic star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="text-yellow-500" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`empty-${i}`} className="text-gray-300" />
          ))}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Feedback</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm uppercase leading-normal">
              <th className="py-3 px-6 text-left">Ratings</th>
              <th className="py-3 px-6 text-left">Comments</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {feedbacks &&
              feedbacks.map((feedback) => (
                <tr
                  key={feedback._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-in-out"
                >
                  <td className="py-4 px-6 flex items-center">
                    {renderStars(feedback.stars)}
                    <span className="ml-2 font-bold">{feedback.stars}</span>
                  </td>
                  <td className="py-4 px-6 truncate font-bold max-w-xs">
                    {feedback.comments}
                  </td>
                  <td className="py-4 px-6 font-semibold text-green-500">
                    {new Date(feedback.created_at).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-all"
                      onClick={() => handleEdit(feedback)}
                    >
                      <FaRegEdit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-all"
                      onClick={() => handleDelete(feedback._id)}
                    >
                      <FaDumpster className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Show Edit Modal when Edit button is clicked */}
      {editFeedback && (
        <EditFeedbackModal
          feedback={editFeedback} // Pass selected feedback to modal
          closeModal={() => setEditFeedback(null)} // Close modal on complete
        />
      )}

      {/* React Toastify container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default FeedbacksTable;
