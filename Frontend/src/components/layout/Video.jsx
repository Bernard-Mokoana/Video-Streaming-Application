import React from "react";
import { Stack, Box } from "@mui/material";
import VideoCard from "../ui/cards/VideoCard";
import ChannelCard from "../ui/cards/ChannelCard";

const Video = ({ videos }) => {
  if (!videos || !Array.isArray(videos)) {
    return <div>No videos available</div>;
  }

  return (
    <div>
      <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
        {videos.map((item, idx) => (
          <Box key={idx}>
            {item && item.id && item.id.videoId && <VideoCard video={item} />}
            {item && item.id && item.id.videoId && (
              <ChannelCard channelDetails={item} />
            )}
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default Video;
