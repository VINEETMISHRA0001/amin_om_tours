import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import authReducer from './features/auth/authSlice';
import contactReducer from './features/contact/contactSlice';
import feedbackReducer from './features/feedbacks/feedbackSlice';
import paymentsReducer from './features/payments/paymentSlice';
import bookingReducer from './features/bookings/bookingsSlice';
import vehicleReducer from './features/vehicles/vehicleSlice';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    contact: contactReducer,
    feedbacks: feedbackReducer,
    payments: paymentsReducer,
    booking: bookingReducer,
    vehicles: vehicleReducer,
  },
  // Allow non-serializable values (for redux-persist actions)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths and actions from the serializable check
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['auth'], // Or other paths as needed
      },
    }),
});

export const persistor = persistStore(store);
export default store;
