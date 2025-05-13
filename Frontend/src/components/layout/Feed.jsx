import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, Skeleton } from "@mui/material";
import { VideoCard } from "../index";
import axios from "axios";

function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/videos");
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={300} height={200} />
          <Skeleton variant="text" width={300} />
          <Skeleton variant="text" width={200} />
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Recommended Videos
      </Typography>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <VideoCard
              video={{
                id: video._id,
                title: video.title,
                thumbnailUrl: video.thumbnailUrl,
                videoUrl: video.videoUrl,
                duration: video.duration,
                views: video.views,
                createdAt: video.createdAt,
                category: video.category,
                channel: {
                  id: video.channel,
                  name: video.channelName || "Unknown Channel",
                  avatarUrl: video.channelAvatar,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Feed;
