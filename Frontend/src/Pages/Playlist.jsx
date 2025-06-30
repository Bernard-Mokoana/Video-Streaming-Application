import React, { useState } from "react";
import {
  Play,
  Plus,
  MoreVertical,
  Search,
  Heart,
  Share2,
  Download,
  Clock,
  Users,
  Lock,
  Globe,
  Trash2,
  Edit3,
  PlayCircle,
  Shuffle,
} from "lucide-react";
import Navbar from "../components/Navbar";

// Mock data
const mockPlaylists = [
  {
    id: 1,
    title: "My Favorite Videos",
    description: "A collection of my most loved content",
    videoCount: 24,
    totalDuration: "2h 45m",
    thumbnail:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop",
    isPublic: true,
    createdAt: "2 days ago",
    views: 1200,
  },
  {
    id: 2,
    title: "Workout Motivation",
    description: "High-energy videos to keep me motivated during workouts",
    videoCount: 18,
    totalDuration: "1h 32m",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    isPublic: false,
    createdAt: "1 week ago",
    views: 0,
  },
  {
    id: 3,
    title: "Cooking Tutorials",
    description: "Learn new recipes and cooking techniques",
    videoCount: 12,
    totalDuration: "3h 18m",
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    isPublic: true,
    createdAt: "2 weeks ago",
    views: 856,
  },
  {
    id: 4,
    title: "Travel Vlogs",
    description: "Amazing travel experiences from around the world",
    videoCount: 31,
    totalDuration: "5h 12m",
    thumbnail:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
    isPublic: true,
    createdAt: "1 month ago",
    views: 2340,
  },
];

const mockVideos = [
  {
    id: 1,
    title: "Amazing Sunset Timelapse",
    channel: "Nature Films",
    duration: "4:32",
    views: "1.2M",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop",
    addedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Morning Workout Routine",
    channel: "FitLife",
    duration: "12:45",
    views: "890K",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=120&fit=crop",
    addedAt: "3 days ago",
  },
  {
    id: 3,
    title: "Homemade Pasta Recipe",
    channel: "Chef's Kitchen",
    duration: "8:21",
    views: "567K",
    thumbnail:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=120&fit=crop",
    addedAt: "1 week ago",
  },
];

function Playlist() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [newPlaylistPrivacy, setNewPlaylistPrivacy] = useState("public");

  const filteredPlaylists = mockPlaylists.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePlaylist = () => {
    // Handle playlist creation logic here
    console.log("Creating playlist:", {
      newPlaylistTitle,
      newPlaylistDescription,
      newPlaylistPrivacy,
    });
    setShowCreateModal(false);
    setNewPlaylistTitle("");
    setNewPlaylistDescription("");
    setNewPlaylistPrivacy("public");
  };

  if (selectedPlaylist) {
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
          {/* Back Button */}
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="mb-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-2"
          >
            <span>← Back to Playlists</span>
          </button>

          {/* Playlist Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={selectedPlaylist.thumbnail}
                  alt={selectedPlaylist.title}
                  className="w-80 h-48 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {selectedPlaylist.title}
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  {selectedPlaylist.description}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="h-5 w-5" />
                    <span>{selectedPlaylist.videoCount} videos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{selectedPlaylist.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{selectedPlaylist.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedPlaylist.isPublic ? (
                      <Globe className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                    <span>
                      {selectedPlaylist.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Play All</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2">
                    <Shuffle className="h-5 w-5" />
                    <span>Shuffle</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-all duration-300">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-all duration-300">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Videos</h2>
            </div>
            <div className="divide-y divide-white/10">
              {mockVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-400 w-8 text-center group-hover:hidden">
                      {index + 1}
                    </div>
                    <div className="hidden group-hover:block">
                      <button className="text-white hover:text-red-400 transition-colors">
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{video.channel}</p>
                      <p className="text-gray-500 text-xs">
                        {video.views} views • Added {video.addedAt}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {video.duration}
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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

      <div className="relative">
        <Navbar />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Video Playlists
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Organize your favorite videos into custom playlists and share them
            with the world.
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search playlists..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Create Playlist</span>
          </button>
        </div>

        {/* Playlists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <div className="relative">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center space-x-2">
                      <PlayCircle className="h-4 w-4" />
                      <span>{playlist.videoCount} videos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {playlist.isPublic ? (
                        <Globe className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 truncate">
                  {playlist.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {playlist.description}
                </p>

                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{playlist.totalDuration}</span>
                  </div>
                  {playlist.isPublic && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{playlist.views.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlaylists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlayCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No playlists found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Create your first playlist to get started"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Create Playlist
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Playlist
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Playlist Title
                </label>
                <input
                  type="text"
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter playlist title..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your playlist..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Privacy
                </label>
                <select
                  value={newPlaylistPrivacy}
                  onChange={(e) => setNewPlaylistPrivacy(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="public" className="bg-gray-800">
                    Public
                  </option>
                  <option value="private" className="bg-gray-800">
                    Private
                  </option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylistTitle}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
