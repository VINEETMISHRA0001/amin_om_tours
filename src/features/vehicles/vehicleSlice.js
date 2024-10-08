import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/admin/vehicles`;

// Thunks for CRUD operations
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/vehicles`
      );
      console.log('API Response:', response.data); // Log the data
      return response.data; // Ensure this is the expected JSON format
    } catch (error) {
      console.error('Error fetching vehicles:', error); // Log any errors
      throw new Error(error.response ? error.response.data : 'Network Error'); // Rethrow with more info
    }
  }
);

export const createVehicle = createAsyncThunk(
  'vehicles/createVehicle',
  async (vehicle) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/new-vehicle`,
      vehicle
    );
    return response.data;
  }
);

export const updateVehicle = createAsyncThunk(
  'vehicles/updateVehicle',
  async ({ id, updates }) => {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  }
);

export const deleteVehicle = createAsyncThunk(
  'vehicles/deleteVehicle',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Vehicle slice
const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = action.payload ? action.payload : []; // Ensure it's an array
      })

      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles.push(action.payload);
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.vehicles.findIndex(
          (vehicle) => vehicle.id === action.payload.id
        );
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = state.vehicles.filter(
          (vehicle) => vehicle.id !== action.payload
        );
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default vehicleSlice.reducer;
