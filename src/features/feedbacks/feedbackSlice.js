import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Async thunk to fetch feedback data from the API
export const fetchFeedbacks = createAsyncThunk(
  'feedbacks/fetchFeedbacks',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/users/feedback`);
    return response.data;
  }
);

// Async thunk to edit a feedback
export const editFeedback = createAsyncThunk(
  'feedbacks/editFeedback',
  async ({ id, updatedFeedback }) => {
    const response = await axios.put(
      `${API_BASE_URL}/users/feedback/${id}`,
      updatedFeedback
    );
    return response.data; // returning updated feedback
  }
);

// Async thunk to delete a feedback
export const deleteFeedback = createAsyncThunk(
  'feedbacks/deleteFeedback',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/users/feedback/${id}`);
    return id; // returning the deleted feedback ID
  }
);

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle edit feedback
      .addCase(editFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(
          (fb) => fb._id === action.payload._id
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload; // Update feedback in the state
        }
      })

      // Handle delete feedback
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.feedbacks.filter(
          (fb) => fb._id !== action.payload
        );
      });
  },
});

export default feedbackSlice.reducer;
