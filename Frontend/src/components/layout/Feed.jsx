import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Video from "./Video";
import { fetchFromAPI } from "../../utils/fetchFromAPI.js";
function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchFromAPI(
          `search?part=snippet&=${selectedCategory}`
        );
        setVideos(data.items || []);
        setError(null);
      } catch (error) {
        console.log("Failed to load videos", error);
        setError("Failed to load videos. Please try again later.");
      }
    };

    loadVideos();
  }, [selectedCategory]);

  // if (error) return <div className="error">{error}</div>;
  // if (!videos.length) return <div>Loading videos...</div>;

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "93vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2025 NonchalantTech
        </Typography>
      </Box>

      <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#fff" }}>Videos</span>
        </Typography>

        <Video videos={[videos]} />
      </Box>
    </Stack>
  );
}

export default Feed;
