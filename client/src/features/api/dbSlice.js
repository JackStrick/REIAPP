import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dbService from './dbService'; // Import your database service

const initialState = {
  properties: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
};

// Create an asynchronous thunk for fetching properties
export const fetchProperties = createAsyncThunk('db/fetchProperties', async (_, thunkAPI) => {
  try {
    const response = await dbService.getProperties();
    //console.log('dbSlice.js - Returning property data', response);
    return response; // Assuming your service returns the data directly
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching properties';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for fetching user properties
export const fetchUserProperties = createAsyncThunk('db/fetchUserProperties', async (userId, thunkAPI) => {
  try {
    const response = await dbService.getUserProperties(userId);
    console.log('dbSlice.js - Returning property data', response);
    return response; // Assuming your service returns the data directly
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching user properties';
    return thunkAPI.rejectWithValue(message);
  }
});



export const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = dbSlice.actions;
export const dbReducer = dbSlice.reducer;
