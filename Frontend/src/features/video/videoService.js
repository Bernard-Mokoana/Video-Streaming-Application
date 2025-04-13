import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api.js";


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