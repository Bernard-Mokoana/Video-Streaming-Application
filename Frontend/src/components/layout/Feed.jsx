import React, { useState, useEffect, useMemo } from "react";
import { Box, Stack, Typography, Grid, Skeleton, Chip } from "@mui/material";
import { VideoCard } from "../index";
import { videoAPI } from "../../api/endpoints";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from API
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const apiVideos = await videoAPI.getFeed();
        const formattedVideos = apiVideos.map((video) => ({
          id: video._id,
          title: video.title,
          thumbnailUrl: video.thumbnailFile,
          videoUrl: video.videoFile,
          views: video.views,
          createdAt: video.createdAt,
          channel: {
            id: video.owner?._id || "unknown",
            name: video.owner?.username || "Unknown Channel",
            avatarUrl: video.owner?.avatar || null,
            verified: false,
          },
        }));
        const filtered =
          selectedCategory === "All"
            ? formattedVideos
            : formattedVideos.filter(
                (video) => video.category === selectedCategory
              );
        setVideos(filtered);
      } catch (error) {
        console.error("Error loading videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [selectedCategory]);

  // Dynamically generate categories from videos
  const categories = useMemo(() => {
    const cats = new Set(videos.map((v) => v.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [videos]);

  // Filter videos by selected category
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <Box className="flex-1 p-4 md:ml-[240px] mt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Categories */}
      <Box className="mb-6 overflow-x-auto scrollbar-hide">
        <Stack direction="row" spacing={1} className="pb-2 flex-nowrap">
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "filled" : "outlined"}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            />
          ))}
        </Stack>
      </Box>

      {/* Videos Grid */}
      <Typography
        variant="h5"
        className="mb-4 font-bold text-gray-900 dark:text-white"
      >
        {selectedCategory} Videos
      </Typography>

      {filteredVideos.length === 0 && !loading ? (
        <Typography className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No videos found for this category
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Box className="w-full">
                    <Skeleton
                      variant="rectangular"
                      className="w-full rounded-xl"
                      height={180}
                    />
                    <Box className="flex gap-2 mt-2">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box className="flex-1">
                        <Skeleton height={20} width="90%" />
                        <Skeleton height={20} width="60%" />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))
            : filteredVideos.map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                  <VideoCard video={video} />
                </Grid>
              ))}
        </Grid>
      )}
    </Box>
  );
}

export default Feed;
