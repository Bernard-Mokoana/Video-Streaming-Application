import React from "react";

function VideoCard({ video }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={video.thumbnail}
        alt={video.title}
      />
      <div className="p-3 text-white text-lg font-semibold">{video.title}</div>
    </div>
  );
}

export default VideoCard;
