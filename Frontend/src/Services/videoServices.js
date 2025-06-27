import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos`);
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
};

export const getVideoById = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
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

export const updateVideo = async () => {
  try {
    const response = await axios.patch(`${API_URL}/videos/${id}`);
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
