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
// Create an asynchronous thunk for fetching specific properties
export const fetchPropertyById = createAsyncThunk('db/fetchPropertyById', async (propertyId, thunkAPI) => {
  try {
    const response = await dbService.getPropertyById(propertyId);
    return response; // Assuming service returns the data directly
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching property';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for fetching property analytics
export const fetchPropertyAnalytics = createAsyncThunk('db/fetchPropertyAnalytics', async (zpid, thunkAPI) => {
  try {
    const response = await dbService.getPropertyAnalytics(zpid);
    return response;

  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching property analytics';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for fetching user properties
export const fetchUserProperties = createAsyncThunk('db/fetchUserProperties', async (userId, thunkAPI) => {
  try {
    const response = await dbService.getUserProperties(userId);
    return response; // Assuming your service returns the data directly
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching user properties';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for fetching user properties
export const isUserProperty = createAsyncThunk('db/isUserProperty', async ({ userId, propertyId }, thunkAPI) => {

  try {
    const response = await dbService.isUserProperty(userId, propertyId);
    return response; // Assuming your service returns the data directly
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error fetching user properties';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for deleting a user property
export const deleteUserProperty = createAsyncThunk('db/deletedUserProperty', async ({ userId, propertyId }, thunkAPI) => {
  try {
    const response = await dbService.deleteUserProperty(userId, propertyId);
    return response; 
  } catch(error) {
    const message = error.response?.data?.message || error.message || 'Error fetching user properties';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create an asynchronous thunk for adding a user property
export const createUserProperty = createAsyncThunk('db/addUserProperty', async ({ userId, propertyId }, thunkAPI) => {
  try {
    const response = await dbService.createUserProperty(userId, propertyId);
    return response; 
  } catch(error) {
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
