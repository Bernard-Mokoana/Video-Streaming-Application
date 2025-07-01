import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    console.log("Login Successful", response.data);
  } catch (error) {
    console.log("Login failed ", error.message);
  }
};

export const registerUser = async () => {};

export const refreshAccessToken = async () => {};

export const changeCurrentPassword = async () => {};

export const getCurrentUser = async () => {};

export const updateUserAvatar = async () => {};

export const updateUserCoverImage = async () => {};

export const getUserChannelProfile = async () => {};

export const updateAccountDetails = async () => {};
