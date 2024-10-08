import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Async thunk to fetch contact data from the API
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/contact`);
    return response.data.data; // Returning only the data array
  }
);

// Async thunk to edit a contact
export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `${API_BASE_URL}/contact/${id}`,
      updatedData
    );
    return response.data; // Return updated contact data
  }
);

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/contact/${id}`);
    return id; // Return ID of the deleted contact
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        const index = state.contacts.findIndex(
          (contact) => contact._id === updatedContact._id
        );
        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload
        );
      });
  },
});

export default contactSlice.reducer;
