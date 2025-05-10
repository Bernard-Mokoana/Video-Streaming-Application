import React from "react";
import { Grid, Box } from "@mui/material";
import VideoCard from "../ui/cards/VideoCard";
import Avatar from "@mui/material/Avatar";

const fadeInStyle = {
  animation: "fadeIn 0.7s ease",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "none" },
  },
};

const Video = ({ videos }) => {
  if (!videos || !Array.isArray(videos)) {
    return <div>No videos available</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={4}>
        {videos.map((item, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id || idx}
            sx={fadeInStyle}
          >
            <Box
              sx={{
                transition:
                  "transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.04)",
                  boxShadow: 6,
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <VideoCard video={item} />
              <Avatar
                src={
                  item.safeChannel.avatarUrl &&
                  item.safeChannel.avatarUrl.startsWith("http")
                    ? item.safeChannel.avatarUrl
                    : "/default-avatar.png"
                }
                alt={item.safeChannel.name}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Video;
