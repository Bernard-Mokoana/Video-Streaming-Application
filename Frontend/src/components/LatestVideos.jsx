import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../Services/videoServices";
import Loader from "./Loader";

function LatestVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        const latestVideos = data.slice(0, 3);

        for (let index = 0; index < latestVideos.length; index++) {
          const element = latestVideos[index];
          console.log("Fetched video ", index + 1, ": ", element);
        }

        setVideos(latestVideos || []);
      } catch (error) {
        console.log("Error to fetch videos", error.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Latest Videos</h2>
          <p className="text-white text-semibold">
            Explore our latest video content
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          onClick={() => {
            console.log("Navigate to all videos");
          }}
        >
          View All Videos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default LatestVideos;
