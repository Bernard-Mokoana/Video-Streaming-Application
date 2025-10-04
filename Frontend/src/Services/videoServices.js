import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos: ", error);
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Error fetching videos"
    );
  }
};

export const getVideoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the user video: ", error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Error fetching video"
    );
  }
};

export const uploadVideos = async (formData) => {
  try {
    // Get token from localStorage or cookies
    const token =
      localStorage.getItem("accessToken") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(`${API_URL}/videos/upload`, formData, {
      withCredentials: true,
      headers,
    });
    console.log("Video uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      "Error uploading video: " +
        (error?.response?.data?.message || error?.message || "Unknown error")
    );
  }
};

export const updateVideo = async (id, formData) => {
  try {
    const response = await axios.patch(`${API_URL}/videos/${id}`, formData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error updating video: ", error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Error updating video"
    );
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/videos/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error?.response?.data?.message || error?.message || "Error deleting video"
    );
  }
};

export const togglePublishStatus = async (id) => {
  try {
    const response = await axios.patch(
      `${API_URL}/videos/toggle/publish/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Error toggling publish status"
    );
  }
};
