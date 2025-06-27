import React from "react";

function VideoCard({ video }) {
  return (
    <div className="bg-gray-800 rounded shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        className="w-full h-48 object-cover"
        src={video.thumbnail}
        alt={video.title}
      />
      <div className="p-2 text-white font-semibold">{video.title}</div>
    </div>
  );
}

export default VideoCard;
