import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from "../../api/api.js";

export const createChannel = createAsyncThunk(
    'channels/create',
    async (channelData, { rejectedWithValue }) => {
        try {
            const formData = new formData();
            formData.append('name', channelData.name);
            formData.append('description', channelData.description);
            formData.append('avatar', channelData.avatar);

            const response = await API.post('/channels', formData, {
                headers: {
                    'content-Type': 'multipart/form-data',
                }
            });
            
            return {
                id: response.data.id,
                name: response.data.mame,
                avatarUrl: response.data.avatarUrl,
                subscribers: 0
            }
        } catch(error){
            return rejectedWithValue({
                message: error.response?.data?.message || "channel creation failed",
                validationErrors: error.response?.data?.errors
            })
        }
    });

const initialState = {
    entities: {},
    ids: [],
    status: "idle",
    error: null,
    creationStatus: 'idle',
    validationErrors: null,
}

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      resetCreationState: (state) => {
        state.creationStatus = 'idle';
        state.error = null;
        state.validationErrors = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createChannel.pending, (state) => {
          state.creationStatus = 'loading';
        })
        .addCase(createChannel.fulfilled, (state, action) => {
          state.creationStatus = 'succeeded';
          state.entities[action.payload.id] = action.payload;
          state.ids.unshift(action.payload.id); 
        })
        .addCase(createChannel.rejected, (state, action) => {
          state.creationStatus = 'failed';
          state.error = action.payload.message;
          state.validationErrors = action.payload.validationErrors;
        });
    }
  });