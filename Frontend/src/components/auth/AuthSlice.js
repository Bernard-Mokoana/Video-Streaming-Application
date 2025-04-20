import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api.js";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.login(credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.register(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isOpen: false,
    activeTab: "login",
    status: "idle",
    error: null,
    user: null,
  },
  reducers: {
    openAuthModal: (state, { payload }) => {
      state.isOpen = true;
      state.activeTab = payload || "login";
      state.error = null;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
      state.error = null;
    },
    switchTab: (state, { payload }) => {
      state.activeTab = payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        state.isOpen = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload?.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        state.activeTab = "login";
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload?.message || "Registration failed";
      });
  },
});

export const { openAuthModal, closeAuthModal, switchTab, logout } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
