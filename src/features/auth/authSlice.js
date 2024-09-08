// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('authToken', response.data.token); // Store token in localStorage
      localStorage.setItem('userDetails', JSON.stringify(response.data.user)); // Store token in localStorage
      return response.data; // Return user data and token
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userDetails')) || {}, // Ensure it's parsed as JSON
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = {}; // Clear user object
      state.token = null; // Clear token
      localStorage.removeItem('authToken'); // Remove token from localStorage
      localStorage.removeItem('userDetails'); // Remove user details from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Ensure user is set correctly
        state.token = action.payload.token; // Ensure token is set correctly
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
