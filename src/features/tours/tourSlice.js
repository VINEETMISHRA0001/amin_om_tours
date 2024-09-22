// src/features/tours/tourSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Async thunks for API calls
export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  const response = await axios.get(`${API_BASE_URL}/tours`);
  return response.data;
});

export const addTour = createAsyncThunk('tours/addTour', async (tourData) => {
  const response = await axios.post(`${API_BASE_URL}/tours`, tourData);
  return response.data;
});

export const updateTour = createAsyncThunk(
  'tours/updateTour',
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `${API_BASE_URL}/tours/${id}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteTour = createAsyncThunk('tours/deleteTour', async (id) => {
  await axios.delete(`${API_BASE_URL}/tours/${id}`);
  return id;
});

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTour.fulfilled, (state, action) => {
        state.tours.push(action.payload);
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        const index = state.tours.findIndex(
          (tour) => tour._id === action.payload._id
        );
        state.tours[index] = action.payload;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.tours = state.tours.filter((tour) => tour._id !== action.payload);
      });
  },
});

export default tourSlice.reducer;
