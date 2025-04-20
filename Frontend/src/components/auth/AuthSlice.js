import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../api/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authAPI.login(credentials);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isOpen: false,
    activeTab: 'login',
    status: 'idle',
    error: null
  },
  reducers: {
    openAuthModal: (state, { payload }) => {
      state.isOpen = true;
      state.activeTab = payload || 'login';
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
    switchTab: (state, { payload }) => {
      state.activeTab = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isOpen = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload?.message || 'Login failed';
      });
  }
});

export const { openAuthModal, closeAuthModal, switchTab } = authSlice.actions;
export default authSlice.reducer;