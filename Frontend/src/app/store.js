import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../components/auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
