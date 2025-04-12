import { createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import API from "../../api/api.js";

const videosAdapter = createEntityAdapter({
    selectId: (video) => video._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});


export const fetchVidoes = createAsyncThunk(
    'videos/fetchAll',
    async (_,  {rejectWithValue }) => {

try {
    const response = await API.get('/videos');
    return response.data;
} catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to laod videos');
}  
 });

 export const uploadVideo = createAsyncThunk(
    'videos/upload',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await API.post('/videos', formData, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Upload failed");
        }
    });

    const initialState = videosAdapter.getInitialState({
        status: 'idle',
        error: null,
        currentVideo: null
    });

export const VideoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        },
        incrementViewCount: (state, action) => {
            const videoId = action.payload;
            const video = state.entities[videoId];
            if (video) video.views += 1;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchVidoes.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchVidoes.fulfilled, (state, action) => {
            state.status = 'suceeded';
            videosAdapter.setAll(state, action.payload);
        })
        .addCase(fetchVidoes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })

        .addCase(uploadVideo.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(uploadVideo.fulfilled, (state, action) => {
            state.status = "succeeded";
           videosAdapter.addOne(state, action.payload);
        })
        .addCase(uploadVideo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
    });

    export const {
        setCurrentVideo,
        incrementViewCount
    } = VideoSlice.actions;

export const {
    selectAll: selectAllVideos,
    selectById: selectVideoById,
    selectIds: selectVideoIds
} = videosAdapter.getSelectors((state) => state.videos);

export const selectVideosStatus = (state) => state.videos.status;
export const selectCurrentVideo = (state) => state.videos.currentVideo;

export default VideoSlice.reducer;