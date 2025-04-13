import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';


export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await API.post('/auth/login', { email, password });
        return response.data; 
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

  
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { getState, rejectWithValue }) => {
      try {
        const { token } = getState().auth;
        if (!token) return rejectWithValue('No token found');
        
        const response = await API.get('/auth/me');
        return response.data.user;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Authentication failed');
    }
});
  