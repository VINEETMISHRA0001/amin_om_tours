// src/slices/vehicleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;
// API endpoint
const API_URL = `${API_BASE_URL}/admin/vehicles`;

// Thunks for CRUD operations
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const createVehicle = createAsyncThunk(
  'vehicles/createVehicle',
  async (vehicle) => {
    const response = await axios.post(
      `${API_BASE_URL}/admin/new-vehicle`,
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
        state.vehicles = action.payload;
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
