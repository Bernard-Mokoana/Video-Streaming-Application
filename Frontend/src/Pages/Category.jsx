import React, { useState } from "react";
import {
  Play,
  Search,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  Eye,
  Star,
  ChevronDown,
  Calendar,
  User,
  PlayCircle,
  Heart,
  Share2,
  MoreVertical,
  Flame,
} from "lucide-react";

// Mock categories data
const categories = [
  {
    id: 1,
    name: "Music",
    description: "Latest music videos, concerts, and artist performances",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    videoCount: 15420,
    color: "from-pink-500 to-rose-600",
    icon: "🎵",
  },
  {
    id: 2,
    name: "Gaming",
    description: "Gaming tutorials, reviews, and epic gameplay moments",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    videoCount: 8930,
    color: "from-purple-500 to-indigo-600",
    icon: "🎮",
  },
  {
    id: 3,
    name: "Education",
    description: "Learn something new with educational content",
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    videoCount: 12650,
    color: "from-blue-500 to-cyan-600",
    icon: "📚",
  },
  {
    id: 4,
    name: "Sports",
    description: "Sports highlights, training, and live coverage",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
    videoCount: 7890,
    color: "from-green-500 to-emerald-600",
    icon: "⚽",
  },
  {
    id: 5,
    name: "Technology",
    description: "Tech reviews, tutorials, and industry news",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    videoCount: 9340,
    color: "from-orange-500 to-red-600",
    icon: "💻",
  },
  {
    id: 6,
    name: "Travel",
    description: "Explore the world through amazing travel vlogs",
    thumbnail:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
    videoCount: 5670,
    color: "from-teal-500 to-blue-600",
    icon: "✈️",
  },
  {
    id: 7,
    name: "Food & Cooking",
    description: "Delicious recipes and cooking techniques",
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
    videoCount: 4320,
    color: "from-yellow-500 to-orange-600",
    icon: "🍳",
  },
  {
    id: 8,
    name: "Fitness",
    description: "Workout routines and fitness motivation",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    videoCount: 6780,
    color: "from-red-500 to-pink-600",
    icon: "💪",
  },
];

// Mock trending videos data
const trendingVideos = [
  {
    id: 1,
    title: "Epic Gaming Montage 2024",
    channel: "ProGamer",
    views: "2.5M",
    duration: "8:42",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=180&fit=crop",
    category: "Gaming",
    uploadTime: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    title: "Amazing Guitar Solo Performance",
    channel: "MusicMaster",
    views: "1.8M",
    duration: "5:23",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=180&fit=crop",
    category: "Music",
    uploadTime: "4 hours ago",
    trending: true,
  },
  {
    id: 3,
    title: "The Future of AI Explained",
    channel: "TechVision",
    views: "950K",
    duration: "12:15",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=180&fit=crop",
    category: "Technology",
    uploadTime: "1 day ago",
    trending: false,
  },
  {
    id: 4,
    title: "World Cup Highlights",
    channel: "SportsCenter",
    views: "3.2M",
    duration: "15:30",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=180&fit=crop",
    category: "Sports",
    uploadTime: "6 hours ago",
    trending: true,
  },
];

function Category() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = selectedCategory
    ? trendingVideos.filter((video) => video.category === selectedCategory.name)
    : trendingVideos;

  if (selectedCategory) {
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-2"
          >
            <span>← Back to Categories</span>
          </button>

          {/* Category Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <div
                  className={`w-80 h-48 bg-gradient-to-br ${selectedCategory.color} rounded-xl shadow-lg flex items-center justify-center text-6xl`}
                >
                  {selectedCategory.icon}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {selectedCategory.name}
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  {selectedCategory.description}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="h-5 w-5" />
                    <span>
                      {selectedCategory.videoCount.toLocaleString()} videos
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Trending Category</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Watch Now</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                >
                  <option value="popular" className="bg-gray-800">
                    Popular
                  </option>
                  <option value="recent" className="bg-gray-800">
                    Most Recent
                  </option>
                  <option value="duration" className="bg-gray-800">
                    Duration
                  </option>
                  <option value="views" className="bg-gray-800">
                    Most Viewed
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>

              <div className="flex bg-white/10 rounded-lg border border-white/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-l-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-r-lg transition-colors ${
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

          {/* Videos Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className={`bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative ${
                    viewMode === "list" ? "w-48 flex-shrink-0" : ""
                  }`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`object-cover ${
                      viewMode === "list" ? "w-full h-28" : "w-full h-40"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {video.trending && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Flame className="h-3 w-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                      <Play className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{video.channel}</p>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-3 w-3" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Video Categories
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing content across different categories tailored to
            your interests.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={category.thumbnail}
                  alt={category.name}
                  className="w-full h-40 object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent`}
                />
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-xl shadow-lg`}
                  >
                    {category.icon}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-gray-300 text-sm">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    <span>{category.videoCount.toLocaleString()} videos</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div
                    className={`bg-gradient-to-r ${category.color} text-white p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform`}
                  >
                    <Play className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-300 text-sm line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingVideos.slice(0, 4).map((video) => (
              <div
                key={video.id}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {video.trending && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Flame className="h-3 w-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                      <Play className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">{video.channel}</p>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>{video.views} views</span>
                    <span>{video.uploadTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No categories found
            </h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
