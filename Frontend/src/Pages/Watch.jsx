import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Heart,
  Share2,
  Download,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Bell,
  BellRing,
  MoreVertical,
  Send,
  Clock,
  Eye,
  User,
  Flame,
  PlayCircle,
  MessageCircle,
  Bookmark,
  List,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock video data
const currentVideo = {
  id: 1,
  title: "Epic Gaming Montage 2024 - Best Moments Compilation",
  description:
    "Welcome to the most epic gaming montage of 2024! This compilation features the best gaming moments, incredible plays, and unforgettable highlights from various popular games. Whether you're a casual gamer or a pro, this video will definitely get you hyped!\n\n🎮 Games Featured:\n- Valorant\n- Call of Duty\n- Apex Legends\n- Fortnite\n- League of Legends\n\n🔥 Don't forget to like and subscribe for more amazing content!\n\n#Gaming #Montage #Epic #2024",
  channel: {
    name: "ProGamer",
    subscribers: "2.5M",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
    verified: true,
    subscribed: false,
  },
  stats: {
    views: "2,543,891",
    likes: 125600,
    dislikes: 3200,
    uploadDate: "2 days ago",
    duration: "8:42",
  },
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  thumbnail:
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop",
};

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: {
      name: "GameMaster2024",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    comment:
      "This montage is absolutely insane! The editing is on another level 🔥",
    likes: 234,
    timeAgo: "2 hours ago",
    replies: 12,
    liked: false,
  },
  {
    id: 2,
    user: {
      name: "EpicPlayer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    comment:
      "That Valorant clutch at 3:45 was CLEAN! How did you even hit that shot?",
    likes: 156,
    timeAgo: "4 hours ago",
    replies: 8,
    liked: true,
  },
  {
    id: 3,
    user: {
      name: "StreamQueen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c2ba?w=40&h=40&fit=crop&crop=face",
    },
    comment: "The music sync is perfect! What's the song at 2:30?",
    likes: 89,
    timeAgo: "6 hours ago",
    replies: 3,
    liked: false,
  },
];

// Mock recommended videos
const recommendedVideos = [
  {
    id: 2,
    title: "Top 10 Gaming Moments That Broke The Internet",
    channel: "GameHighlights",
    views: "1.8M",
    duration: "12:34",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=180&fit=crop",
    timeAgo: "1 week ago",
  },
  {
    id: 3,
    title: "Insane Valorant Aces Compilation",
    channel: "ValorantPro",
    views: "967K",
    duration: "6:15",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=180&fit=crop",
    timeAgo: "3 days ago",
  },
  {
    id: 4,
    title: "How to Improve Your Aim in FPS Games",
    channel: "ProTips",
    views: "2.1M",
    duration: "15:42",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=180&fit=crop",
    timeAgo: "5 days ago",
  },
];

function Watch() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(currentVideo.channel.subscribed);
  const [showDescription, setShowDescription] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * duration;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        },
        comment: newComment,
        likes: 0,
        timeAgo: "now",
        replies: 0,
        liked: false,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div
              ref={containerRef}
              className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                className="w-full aspect-video"
                poster={currentVideo.thumbnail}
                onClick={togglePlay}
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Progress Bar */}
                <div
                  className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-red-400 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 accent-red-500"
                      />
                    </div>

                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="text-white hover:text-red-400 transition-colors">
                      <Settings className="h-5 w-5" />
                    </button>
                    <button className="text-white hover:text-red-400 transition-colors">
                      {isFullscreen ? (
                        <Minimize className="h-5 w-5" />
                      ) : (
                        <Maximize className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                  >
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-6">
              <h1 className="text-2xl font-bold text-white mb-4">
                {currentVideo.title}
              </h1>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentVideo.channel.avatar}
                    alt={currentVideo.channel.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-semibold">
                        {currentVideo.channel.name}
                      </h3>
                      {currentVideo.channel.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {currentVideo.channel.subscribers} subscribers
                    </p>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      subscribed
                        ? "bg-gray-600 text-white hover:bg-gray-700"
                        : "bg-red-500 text-white hover:bg-red-600 transform hover:scale-105"
                    }`}
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex bg-white/10 rounded-full border border-white/20">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-l-full transition-colors ${
                        liked
                          ? "text-blue-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">
                        {(
                          currentVideo.stats.likes + (liked ? 1 : 0)
                        ).toLocaleString()}
                      </span>
                    </button>
                    <div className="w-px bg-white/20"></div>
                    <button
                      onClick={handleDislike}
                      className={`px-4 py-2 rounded-r-full transition-colors ${
                        disliked
                          ? "text-red-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>

                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>

                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-gray-400 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{currentVideo.stats.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{currentVideo.stats.uploadDate}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/5 rounded-lg p-4">
                <div
                  className={`text-gray-300 ${
                    showDescription ? "" : "line-clamp-3"
                  }`}
                >
                  {currentVideo.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index <
                        currentVideo.description.split("\n").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2 flex items-center space-x-1"
                >
                  <span>{showDescription ? "Show less" : "Show more"}</span>
                  {showDescription ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>{comments.length} Comments</span>
              </h2>

              {/* Add Comment */}
              <div className="flex space-x-4 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setNewComment("")}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-semibold text-sm">
                          {comment.user.name}
                        </h4>
                        <span className="text-gray-400 text-xs">
                          {comment.timeAgo}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{comment.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button
                          className={`flex items-center space-x-1 ${
                            comment.liked
                              ? "text-blue-400"
                              : "text-gray-400 hover:text-white"
                          } transition-colors`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span className="text-xs">{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                        <button className="text-gray-400 hover:text-white text-xs transition-colors">
                          Reply
                        </button>
                        {comment.replies > 0 && (
                          <button className="text-blue-400 text-xs hover:text-blue-300">
                            {comment.replies} replies
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Videos */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Flame className="h-5 w-5" />
                <span>Up Next</span>
              </h2>

              <div className="space-y-4">
                {recommendedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex space-x-3 cursor-pointer group hover:bg-white/5 rounded-lg p-2 transition-colors"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {video.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-red-500 text-white p-2 rounded-full">
                          <Play className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-1">
                        {video.channel}
                      </p>
                      <div className="text-gray-500 text-xs">
                        <span>{video.views} views</span> •{" "}
                        <span>{video.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Playlist Widget */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <List className="h-4 w-4" />
                  <span>Add to Playlist</span>
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Create new
                </button>
              </div>

              <div className="space-y-2">
                {["Gaming Favorites", "Epic Moments", "Best of 2024"].map(
                  (playlist, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded p-2"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-300 text-sm">{playlist}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
