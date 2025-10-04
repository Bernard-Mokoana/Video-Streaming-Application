import { Videos } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Videos.find()
    .populate("owner", "username avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  if (!req.files.videoFile || !req.files.thumbnailFile) {
    throw new ApiError(400, "Both videoFile and thumbnailFile are required.");
  }

  const videoFile = req.files.videoFile[0].path;
  const thumbnailFile = req.files.thumbnailFile[0].path;

  const videoUploadResponse = await uploadOnCloudinary(videoFile);
  if (!videoUploadResponse?.url) {
    throw new ApiError(500, "Failed to upload video to cloudinary");
  }

  const thumbnailUploadResponse = await uploadOnCloudinary(thumbnailFile);
  if (!thumbnailUploadResponse?.url) {
    throw new ApiError(500, "Failed to uplaod thumbnail to cloudinary");
  }

  const video = await Videos.create({
    title,
    description,
    videoFile: videoUploadResponse.url,
    thumbnailFile: thumbnailUploadResponse.url,
    owner: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  const video = await Videos.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;
    const thumbnailFile = req.file?.path;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      throw new ApiError(401, "Invalid video Id");
    }

    const video = await Videos.findOne({ _id: videoId, owner: req.user._id });

    if (!video) {
      throw new ApiError(
        404,
        "Video not found or you not authorized to update this video"
      );
    }

    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailFile) {
      const thumbnailUploadResponse = await uploadOnCloudinary(thumbnailFile);
      if (!thumbnailUploadResponse?.url) {
        throw new ApiError(500, "Failed to upload thumbnail");
      }
      video.thumbnailFile = thumbnailUploadResponse.url;
    }
    await video.save();

    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video updated successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error while updating video");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      throw new ApiError(400, "Invalid video Id");
    }

    const video = await Videos.findOne({ _id: videoId, owner: req.user._id });

    if (!video) {
      throw new ApiError(
        404,
        "video not found or you are not athorized to delete the video"
      );
    }

    await Videos.deleteOne({ _id: videoId });

    return res
      .status(200)
      .json(new ApiResponse(200, "Video deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error while deleting a video");
  }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      throw new ApiError(400, "Invalid video Id");
    }

    if (!videoId) {
      throw new ApiError(
        404,
        "Video not found or you not authorized to toggle publish status"
      );
    }

    const video = await Videos.findOne({ _id: videoId, owner: req.user._id });

    video.isPublished = !video.isPublished;
    await video.save();

    return res
      .status(200)
      .json(new ApiResponse(200, video, "Publish status toggled successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Error while toggling publish status"
    );
  }
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
