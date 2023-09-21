// Import necessary dependencies from Redux Toolkit
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Import your Redux reducers from their respective locations
import authReducer from '../features/auth/authSlice';
import modeReducer from '../features/mode/modeSlice';
// Import the Redux Toolkit Query slice reducer (not the entire slice)
import { dbReducer } from '../features/api/dbSlice'; // Use dbReducer, not dbSlice

// Import the setupListeners function from Redux Toolkit Query
import { setupListeners } from '@reduxjs/toolkit/query';

// Define the middleware array configuration
const middleware = [...getDefaultMiddleware()];

// Configure and create your Redux store
export const store = configureStore({
  reducer: {
    // Define your Redux reducers
    auth: authReducer,
    mode: modeReducer,
    db: dbReducer, // Include the Redux Toolkit Query slice reducer
  },
  middleware: middleware, // Use the middleware array
});

// Set up listeners for Redux Toolkit Query
setupListeners(store.dispatch);
