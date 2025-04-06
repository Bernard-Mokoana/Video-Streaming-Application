import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import videoReducer from "../features/video/videoSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
    },

    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware( {
            serializableCheck: false,
        })
    }
});