import React, { useState, useEffect } from "react";
import { getAllVideos } from "../Services/videoServices.js";
import VideoCard from "../components/VideoCard.jsx";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Eye,
  Calendar,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);

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

  // Filter and sort videos
  const filteredAndSortedVideos = videos
    .filter(
      (video) =>
        video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        default:
          return 0;
      }
    });

  const stats = {
    totalVideos: videos.length,
    totalViews: videos.reduce((sum, video) => sum + (video.views || 0), 0),
    latestUpload:
      videos.length > 0
        ? Math.max(...videos.map((v) => new Date(v.createdAt || Date.now())))
        : Date.now(),
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      <div className="relative">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-600">
                Amazing Videos
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore trending content, discover new creators, and immerse
              yourself in the world's most engaging videos.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Videos</p>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalVideos.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Grid className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Views</p>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Latest Upload</p>
                  <p className="text-3xl font-bold text-white">
                    {new Date(stats.latestUpload).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-10"
                  >
                    <option value="latest" className="bg-gray-800">
                      Latest
                    </option>
                    <option value="oldest" className="bg-gray-800">
                      Oldest
                    </option>
                    <option value="views" className="bg-gray-800">
                      Most Viewed
                    </option>
                    <option value="title" className="bg-gray-800">
                      Title A-Z
                    </option>
                  </select>
                  <SlidersHorizontal className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery
                ? `Search Results (${filteredAndSortedVideos.length})`
                : "Latest Videos"}
            </h2>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Videos Grid/List */}
          {filteredAndSortedVideos.length > 0 ? (
            <div
              className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            `}
            >
              {filteredAndSortedVideos.map((video) => (
                <div
                  key={video._id}
                  className={`
                    ${
                      viewMode === "list"
                        ? "bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                        : ""
                    }
                  `}
                >
                  <VideoCard video={video} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {searchQuery ? "No videos found" : "No videos available"}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? `No videos match "${searchQuery}". Try adjusting your search terms.`
                  : "There are no videos to display at the moment. Check back later for new content!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  View All Videos
                </button>
              )}
            </div>
          )}

          {/* Trending Section */}
          {!searchQuery && videos.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Trending Now</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 8)
                  .map((video) => (
                    <div
                      key={`trending-${video._id}`}
                      className="relative group"
                    >
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                        🔥
                      </div>
                      <VideoCard video={video} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
