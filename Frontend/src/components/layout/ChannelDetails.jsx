import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import Videos from "./Video.jsx";
import ChannelCard from "../ui/cards/ChannelCard.jsx";
import { fetchFromAPI } from "../../utils/fetchFromAPI.js";

function ChannelDetails() {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      setError(null);

      try {
        const channelData = await fetchFromAPI(
          `channels?part=snippet,statistics&id=${id}`
        );

        if (channelData?.items?.length > 0) {
          setChannelDetail(channelData.items[0]);
        } else {
          throw new Error("Channel not found");
        }

        const videoData = await fetchFromAPI(
          `search?channelId=${id}part=snippet,id&order=date&maxResults=50`
        );

        setVideos(videoData?.items || []);
      } catch (err) {
        console.error("Error fetching channel data:", err);
        setError("Failed to load channel data. Please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);

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
        <CircularProgress />
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
    <Box minHeight="95vh">
      {/* Channel Banner Section */}
      <Box
        sx={{
          height: "300px",
          background: `linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%)`,
          zIndex: 10,
        }}
      />
      <Box
        sx={{
          marginTop: "-110px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {channelDetail && (
          <ChannelCard channelDetail={channelDetail} marginTop="0" />
        )}
      </Box>

      {/* Channel Content Section */}

      <Container maxWidth="lg">
        {channelDetail && (
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {channelDetail.snippet?.title || "Channel Name"}
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              {channelDetail.snippet?.description?.slice(0, 150) ||
                "No description available"}
              {channelDetail.snippet?.description?.length > 150 ? "..." : ""}
            </Typography>

            {/* Container for channel statistics */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {parseInt(
                    channelDetail.statistics?.statistics?.subscriberCount
                  ).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subscribers
                </Typography>
              </Box>

              {/* Video count */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {parseInt(
                    channelDetail.statistics?.videoCount
                  ).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Videos
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {parseInt(
                    channelDetail.statistics?.viewCount
                  ).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Views
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Channel Videos Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontFamily="bold" mb={2}>
            Latest Videos
          </Typography>
          {videos.length > 0 ? (
            <Videos videos={videos} />
          ) : (
            <Box sx={{ display: "flxe", justifyContent: "center", p: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No videos found for this channel
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ChannelDetails;
