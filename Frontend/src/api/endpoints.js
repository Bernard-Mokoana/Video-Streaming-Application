import API from "./api";

// Auth endpoints
export const authAPI = {
  login: (credentials) => API.post("/auth/login", credentials),
  register: (userData) => API.post("/auth/register", userData),
  logout: () => API.post("/auth/logout"),
};

// Video endpoints
export const videoAPI = {
  getFeed: () => API.get("/videos"),
  getVideo: (id) => API.get(`/videos/${id}`),
  createVideo: (videoData) => API.post("/videos", videoData),
  updateVideo: (id, videoData) => API.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => API.delete(`/videos/${id}`),
  getVideosByChannelId: (channelId) => API.get(`/videos/channel/${channelId}`),
};

// Channel endpoints
export const channelAPI = {
  getChannel: (id) => API.get(`/channels/${id}`),
  updateChannel: (id, channelData) => API.put(`/channels/${id}`, channelData),
};

// Search endpoint
export const searchAPI = {
  search: (query) => API.get(`/search?q=${query}`),
};

// Videos
export const getAllVideos = (params) => API.get("/videos", { params });
export const getVideoById = (id) => API.get(`/videos/${id}`);
