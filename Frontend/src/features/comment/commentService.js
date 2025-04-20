import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api.js";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (
    { videoId, page = 1, limit = 10 },
    { getState, rejectedWithValue }
  ) => {
    try {
      const comments = getState();
      const cachedPage = comments.currentPage[videoId]?.[page];

      if (cachedPage && Date.now() - cachedPage.lastFetched < 300000) {
        return {
          videoId,
          data: cachedPage.data,
          isCached: true,
        };
      }

      const response = await API.get(`/videos${videoId}/comments`, {
        params: { page, limit },
      });

      const normalizedData = normalizeComments(response.data);

      return {
        videoId,
        page,
        data: normalizedData,
        lastFetched: Date.now(),
      };
    } catch (error) {
      return rejectedWithValue({
        videoId,
        error: error.response?.data?.message || "Failed to load comments",
        status: error.response?.status,
      });
    }
  }
);

const normalizeComments = (comments) => {
  const entities = {};
  const ids = [];

  const processComment = (comment) => {
    entities[comment.id] = {
      ...comment,
      replies: comment.replies?.map((reply) => reply.id) || [],
    };
    ids.push(comment.id);

    comment.replies?.forEach(processComment);
  };

  comments.forEach(processComment);
  return { entities, ids };
};

export const addComment = createAsyncThunk(
  "comments/add",
  async (
    { videoId, text, parentId = null },
    { getState, rejectedWithValue }
  ) => {
    try {
      const { user } = getState().auth;

      const response = await API.post(
        "/comments",
        {
          videoId,
          text,
          parentId,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      return {
        tempId: `temp-${Date.now()}`,
        serverComment: response.data,
      };
    } catch (error) {
      return rejectedWithValue({
        error: error.response?.data?.message || "Failed to post comment",
        tempId: `temp-${Date.now()}`,
        originalDate: { videoId, text, parentId },
      });
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, newText }, { getState, rejectedWithValue }) => {
    try {
      const response = await API.patch(
        "/comments/:commentId",
        {
          commentId,
          text: newText,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      return {};
    } catch (error) {
      return rejectedWithValue({
        error: error.response?.data?.message || "error updating the message",
      });
    }
  }
);

export const deleteteComment = createAsyncThunk(
  "comment/delete",
  async ({ commentId }, { rejectedWithValue }) => {}
);

export const toggleComment = createAsyncThunk(
  "comment/",
  async ({ commentId, action }, { rejectedWithValue }) => {}
);
