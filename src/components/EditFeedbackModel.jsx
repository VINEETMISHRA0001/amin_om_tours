import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editFeedback } from '../features/feedbacks/feedbackSlice';

const EditFeedbackModal = ({ feedback, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    stars: feedback.stars,
    comments: feedback.comments,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Correct the object to pass to the thunk
    dispatch(editFeedback({ id: feedback._id, updatedFeedback: formData }));
    closeModal(); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Feedback</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              name="stars"
              value={formData.stars}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              max="5"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedbackModal;
