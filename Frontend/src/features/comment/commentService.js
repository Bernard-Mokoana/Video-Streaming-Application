import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api.js";


export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({videoId, page = 1, limit = 10}, { getState, rejectedWithValue}) => {
        try {

            const comments = getState();
            const catchedPage = comments.currentPage[videoId]?.[page];

            if(catchedPage & Date.now() - catchedPage.lastFetched < 300000) {
                return {
                    videoId,
                    data: catchedPage.data,
                    isCatched: true
                };
            }

            const response = await API.get(`/videos${videoId}/comments`, {
                params: { page, limit }
            });

            const normalizedData = normalizeComments(response.data);

           return {
            videoId,
            page,
            data: normalizedData,
            lastFetched: Date.now()
           };
        } catch (error) {
           return rejectedWithValue({
            videoId,
            error: error.response?.data?.message || "Failed to load comments",
            status: error.response?.status,
           })
        }
    });

const normalizeComments = (comments) => {
     const entities = {};
     const ids = [];

     const processComment = (comment) => {
        entities[comment.id] = {
            ...comment,
            replies: comment.replies?.map(reply => reply.id) || []
        };
        ids.push(comment.id);

        comment.replies?.forEach(processComment);
     };

     comments.forEach(processComment);
     return { entities, ids };
}


