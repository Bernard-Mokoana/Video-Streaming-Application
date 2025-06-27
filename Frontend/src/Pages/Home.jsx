import React, { useState, useEffect } from "react";
import { getAllVideos } from "../Services/videoServices.js";
import VideoCard from "../components/VideoCard.jsx";
import Loader from "../components/Loader.jsx";
function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        setVideos(data || []);
        console.log("Data fetched successfully", data);
      } catch (error) {
        console.error("Error fetching data", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Home;
