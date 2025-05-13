import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Chip,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
};

function VideoCard({ video }) {
  if (!video) {
    return null;
  }

  const {
    id,
    title,
    thumbnailUrl,
    duration,
    views,
    createdAt,
    category,
    channel,
  } = video;

  // Fallback values for missing data
  const safeTitle = title || "Untitled Video";
  const safeThumbnail = thumbnailUrl || "https://picsum.photos/640/360";
  const safeDuration = duration || "00:00";
  const safeViews = views || 0;
  const safeCreatedAt = createdAt || new Date().toISOString();
  const safeChannel = channel || {
    id: "unknown",
    name: "Unknown Channel",
    avatarUrl: null,
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
      <Link to={`/video/${id}`} className="block relative">
        <CardMedia
          component="img"
          image={safeThumbnail}
          alt={safeTitle}
          className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
        />
        <Typography
          variant="caption"
          className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white"
        >
          {safeDuration}
        </Typography>
        {category && (
          <Chip
            label={category}
            size="small"
            className="absolute top-2 left-2 bg-black bg-opacity-75 text-white"
          />
        )}
      </Link>

      <CardContent className="p-3">
        <Box className="flex gap-3">
          <Link to={`/channel/${safeChannel.id}`}>
            <Avatar
              src={safeChannel.avatarUrl}
              alt={safeChannel.name}
              className="w-9 h-9"
            />
          </Link>

          <Box className="flex-1">
            <Link to={`/video/${id}`}>
              <Tooltip title={safeTitle}>
                <Typography
                  variant="subtitle1"
                  className="font-semibold line-clamp-2 hover:text-blue-600 transition-colors"
                >
                  {safeTitle}
                </Typography>
              </Tooltip>
            </Link>

            <Link to={`/channel/${safeChannel.id}`}>
              <Box className="flex items-center gap-1">
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {safeChannel.name}
                </Typography>
                <CheckCircle className="text-blue-500" sx={{ fontSize: 14 }} />
              </Box>
            </Link>

            <Typography
              variant="caption"
              className="text-gray-600 dark:text-gray-400"
            >
              {formatViews(safeViews)} views • {formatTimeAgo(safeCreatedAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
