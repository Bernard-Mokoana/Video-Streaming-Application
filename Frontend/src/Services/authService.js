import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, user);
    console.log("Login Successful", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    console.log("Registration Successful", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again."
    );
  }
};

export const refreshAccessToken = async () => {};

export const changeCurrentPassword = async () => {};

export const getCurrentUser = async () => {};

export const updateUserAvatar = async () => {};

export const updateUserCoverImage = async () => {};

export const getUserChannelProfile = async () => {};

export const updateAccountDetails = async () => {};
