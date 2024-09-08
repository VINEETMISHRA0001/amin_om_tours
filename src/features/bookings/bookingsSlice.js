import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Define an initial state
const initialState = {
  bookings: [], // Array to store booking records
  booking: null, // Stores details of a single booking for creating
  currentBooking: null, // Stores details of a single booking for editing
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

// Define an async thunk for fetching all bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/bookings`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/bookings`, formData);
      return response.data; // Assuming response.data contains the booking object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define an async thunk for updating a booking
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, ...updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/bookings/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define an async thunk for deleting a booking
export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/bookings/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the booking slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    resetCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.booking = action.payload.booking; // Accessing the booking object from response
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const updatedBooking = action.payload;
        const index = state.bookings.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCurrentBooking, resetCurrentBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
