import React, { useState } from "react";
import {
  History as HistoryIcon,
  Clock,
  Search,
  Filter,
  Calendar,
  Play,
  Pause,
  Eye,
  Trash2,
  Download,
  Share2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Flame,
  Star,
  Bookmark,
  PlayCircle,
  X,
  CheckSquare,
  Square,
  RotateCcw,
  TrendingUp,
  Gamepad2,
  Zap,
  Award,
  Target,
} from "lucide-react";

// Mock history data
const watchHistory = [
  {
    id: 1,
    title: "Epic Gaming Montage 2024 - Best Moments Compilation",
    channel: "ProGamer",
    channelAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=180&fit=crop",
    duration: "8:42",
    watchedDuration: "6:15",
    watchedPercentage: 72,
    views: "2.5M",
    watchedAt: "2 hours ago",
    category: "Gaming Montage",
    verified: true,
    completed: false,
  },
  {
    id: 2,
    title: "Valorant Pro Tips - Aim Training Guide",
    channel: "ValorantPro",
    channelAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=180&fit=crop",
    duration: "15:32",
    watchedDuration: "15:32",
    watchedPercentage: 100,
    views: "892K",
    watchedAt: "5 hours ago",
    category: "Tutorial",
    verified: false,
    completed: true,
  },
  {
    id: 3,
    title: "League of Legends Championship Highlights",
    channel: "EsportsCenter",
    channelAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=180&fit=crop",
    duration: "45:21",
    watchedDuration: "12:34",
    watchedPercentage: 28,
    views: "3.2M",
    watchedAt: "1 day ago",
    category: "Esports",
    verified: true,
    completed: false,
  },
  {
    id: 4,
    title: "Minecraft Building Masterclass",
    channel: "BlockMaster",
    channelAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=300&h=180&fit=crop",
    duration: "22:15",
    watchedDuration: "22:15",
    watchedPercentage: 100,
    views: "1.4M",
    watchedAt: "2 days ago",
    category: "Tutorial",
    verified: true,
    completed: true,
  },
  {
    id: 5,
    title: "Call of Duty Warzone Best Loadouts 2024",
    channel: "CODMaster",
    channelAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=300&h=180&fit=crop",
    duration: "12:48",
    watchedDuration: "8:30",
    watchedPercentage: 66,
    views: "756K",
    watchedAt: "3 days ago",
    category: "Guide",
    verified: false,
    completed: false,
  },
  {
    id: 6,
    title: "Apex Legends Season 19 Meta Analysis",
    channel: "ApexInsider",
    channelAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c2ba?w=40&h=40&fit=crop&crop=face",
    thumbnail:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=180&fit=crop",
    duration: "18:27",
    watchedDuration: "4:12",
    watchedPercentage: 23,
    views: "445K",
    watchedAt: "1 week ago",
    category: "Analysis",
    verified: true,
    completed: false,
  },
];

const historyStats = {
  totalWatched: 147,
  totalHours: 89.5,
  favoriteCategory: "Gaming Montage",
  streakDays: 12,
  completedVideos: 43,
};

const categories = [
  "All",
  "Gaming Montage",
  "Tutorial",
  "Esports",
  "Guide",
  "Analysis",
  "Reviews",
];
const timeFilters = [
  "All time",
  "Today",
  "This week",
  "This month",
  "Last 3 months",
];

function WatchHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All time");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [history, setHistory] = useState(watchHistory);

  const filteredHistory = history.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    // For demo purposes, we'll just filter by category and search
    return matchesSearch && matchesCategory;
  });

  const handleVideoSelect = (videoId) => {
    setSelectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === filteredHistory.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(filteredHistory.map((video) => video.id));
    }
  };

  const handleDeleteSelected = () => {
    setHistory((prev) =>
      prev.filter((video) => !selectedVideos.includes(video.id))
    );
    setSelectedVideos([]);
  };

  const clearAllHistory = () => {
    setHistory([]);
    setSelectedVideos([]);
  };

  const formatDuration = (duration) => {
    return duration;
  };

  const getProgressColor = (percentage) => {
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
              <HistoryIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Watch History</h1>
              <p className="text-gray-400">Track your gaming journey</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>{viewMode === "grid" ? "List" : "Grid"} View</span>
            </button>
            <button
              onClick={clearAllHistory}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Videos Watched",
              value: historyStats.totalWatched,
              icon: PlayCircle,
              color: "blue",
            },
            {
              label: "Total Hours",
              value: `${historyStats.totalHours}h`,
              icon: Clock,
              color: "purple",
            },
            {
              label: "Completed",
              value: historyStats.completedVideos,
              icon: Award,
              color: "green",
            },
            {
              label: "Watch Streak",
              value: `${historyStats.streakDays} days`,
              icon: Flame,
              color: "orange",
            },
            {
              label: "Top Category",
              value: historyStats.favoriteCategory,
              icon: Target,
              color: "pink",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`h-4 w-4 text-${stat.color}-400`} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Time Filter */}
            <div className="relative">
              <select
                value={selectedTimeFilter}
                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
              >
                {timeFilters.map((filter) => (
                  <option key={filter} value={filter} className="bg-gray-800">
                    {filter}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-wrap gap-2">
                {[
                  "Completed",
                  "In Progress",
                  "Barely Started",
                  "HD Quality",
                  "4K Quality",
                ].map((filter) => (
                  <button
                    key={filter}
                    className="bg-white/10 hover:bg-blue-500/20 text-gray-300 hover:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedVideos.length > 0 && (
          <div className="bg-blue-500/20 backdrop-blur-md rounded-xl border border-blue-500/30 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-300 font-semibold">
                  {selectedVideos.length} video
                  {selectedVideos.length !== 1 ? "s" : ""} selected
                </span>
                <button
                  onClick={handleSelectAll}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                >
                  {selectedVideos.length === filteredHistory.length ? (
                    <>
                      <CheckSquare className="h-4 w-4" />
                      <span>Deselect All</span>
                    </>
                  ) : (
                    <>
                      <Square className="h-4 w-4" />
                      <span>Select All</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Grid/List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-700/50 rounded-full p-6 mx-auto w-fit mb-4">
                <HistoryIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No videos found
              </h3>
              <p className="text-gray-400">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filters"
                  : "Start watching videos to build your history"}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredHistory.map((video) => (
                <div
                  key={video.id}
                  className={`group cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
                      : "bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors flex items-center space-x-4"
                  }`}
                >
                  {viewMode === "list" && (
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => handleVideoSelect(video.id)}
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                  )}

                  <div
                    className={
                      viewMode === "grid"
                        ? "relative"
                        : "relative flex-shrink-0"
                    }
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={
                        viewMode === "grid"
                          ? "w-full h-48 object-cover"
                          : "w-32 h-20 object-cover rounded-lg"
                      }
                    />

                    {/* Duration and Progress Overlay */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>

                    {/* Watch Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                      <div
                        className={`h-full ${getProgressColor(
                          video.watchedPercentage
                        )} transition-all duration-300`}
                        style={{ width: `${video.watchedPercentage}%` }}
                      ></div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <div className="bg-red-500 text-white p-3 rounded-full">
                        <Play className="h-4 w-4" />
                      </div>
                    </div>

                    {viewMode === "grid" && (
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedVideos.includes(video.id)}
                          onChange={() => handleVideoSelect(video.id)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className={viewMode === "grid" ? "p-4" : "flex-1 min-w-0"}
                  >
                    <div className="flex items-start space-x-3">
                      {viewMode === "grid" && (
                        <img
                          src={video.channelAvatar}
                          alt={video.channel}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-white group-hover:text-blue-300 transition-colors ${
                            viewMode === "grid"
                              ? "text-sm line-clamp-2 mb-2"
                              : "text-base mb-1"
                          }`}
                        >
                          {video.title}
                        </h3>

                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-400 text-sm">
                            {video.channel}
                          </span>
                          {video.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 text-gray-500 text-xs mb-2">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.watchedAt}</span>
                          <span>•</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              video.completed
                                ? "bg-green-500/20 text-green-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {video.completed
                              ? "Completed"
                              : `${video.watchedPercentage}% watched`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs bg-white/10 px-2 py-1 rounded">
                            {video.category}
                          </span>

                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-gray-400 hover:text-white p-1">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-white p-1">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-400 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredHistory.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <RotateCcw className="h-5 w-5" />
              <span>Load More History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchHistory;
