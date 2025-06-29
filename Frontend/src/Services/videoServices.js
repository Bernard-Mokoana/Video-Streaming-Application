import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos: ", error);
    throw new error();
  }
};

export const getVideoById = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the user video: ", error);
    throw new error();
  }
};

export const uploadVideos = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/videos`, formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateVideo = async (formData) => {
  try {
    const response = await axios.patch(`${API_URL}/videos/${id}`, formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async () => {
  try {
    const response = await axios.delete(`${API_URL}/videos/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const togglePublishStatus = async () => {
  try {
    const response = await axios.patch(`${API_URL}/videos`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
