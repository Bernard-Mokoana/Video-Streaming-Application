import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../../api/api.js';

// Async Thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
try {
    const response = await API.post('auth/login', { email, password });
    return response.data;
} 
catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
}
});

// Async Thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async(_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            if(!token) return rejectWithValue('No token found');

            const response = await API.get('/auth/me');
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Authentication failed');
        }
    });

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    status: 'idle',
    error: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Synchronous logout action
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
        },

        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        // Login User cases
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        // Current user cases
        .addCase(fetchCurrentUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.status = action.payload;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.status = 'rejected';
            state.status = action.payload;
        });
    }
});

export const { logout, clearError } = AuthSlice.actions;
// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (status) => status.auth.status;

export default AuthSlice.reducer;
