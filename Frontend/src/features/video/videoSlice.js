import { createSlice, createEntityAdapter} from "@reduxjs/toolkit";
import { fetchVidoes, uploadVideo } from "./videoService";

const videosAdapter = createEntityAdapter({
    selectId: (video) => video._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
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