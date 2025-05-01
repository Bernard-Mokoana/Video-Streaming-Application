import { useState } from "react";
import { ClockIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-youtube-dark-secondary rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-1.5 py-0.5 rounded text-xs">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-youtube-dark-secondary"></div>
        </div>
        <div className="overflow-hidden">
          <h3 className="text-youtube-text-primary font-medium line-clamp-2">
            {video.title}
          </h3>
          <p className="text-youtube-text-secondary text-sm mt-1">
            {video.channel}
          </p>
          <div className="flex items-center text-youtube-text-secondary text-xs space-x-2 mt-1">
            <span className="flex items-center">
              <EyeIcon className="h-3 w-3 mr-1" /> {video.views}
            </span>
            <span className="flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" /> {video.uploaded}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
