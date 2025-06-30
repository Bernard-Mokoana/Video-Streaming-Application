import React, { useState } from "react";
import {
  Upload as UploadIcon,
  Video,
  Image,
  FileText,
  Play,
  X,
  Check,
} from "lucide-react";
import Navbar from "../components/Navbar";

const uploadVideos = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id: Date.now() });
    }, 2000);
  });
};

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Prepare the form data for upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (video) formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const response = await uploadVideos(formData);
      console.log("video uploaded successfully:", response);
      setUploadSuccess(true);
      // Reset form after successful upload
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setVideo(null);
        setThumbnail(null);
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setVideo(file);
      }
    }
  };

  const removeFile = (type) => {
    if (type === "video") setVideo(null);
    if (type === "thumbnail") setThumbnail(null);
  };

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
            Upload Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Amazing Video
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your creativity with the world. Upload your video content and
            reach millions of viewers.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {uploadSuccess ? (
            // Success State
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Upload Successful!
              </h3>
              <p className="text-gray-300">
                Your video has been uploaded and is being processed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-semibold text-lg mb-3">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  Video Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your video title..."
                  required
                />
              </div>
              {/* Description Input */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-semibold text-lg mb-3">
                  <FileText className="h-5 w-5 mr-2 text-purple-400" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your video content..."
                  required
                />
              </div>
              ``
              {/* Video Upload */}
              <div className="space-y-4">
                <label className="flex items-center text-white font-semibold text-lg mb-3">
                  <Video className="h-5 w-5 mr-2 text-red-400" />
                  Video File
                </label>

                {video ? (
                  <div className="bg-white/5 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{video.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(video.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("video")}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-blue-400 bg-blue-500/10"
                        : "border-white/30 hover:border-white/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2">
                      Drag and drop your video file here
                    </p>
                    <p className="text-gray-400 mb-4">or</p>
                    <label className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 inline-block">
                      Choose Video File
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
              {/* Thumbnail Upload */}
              <div className="space-y-4">
                <label className="flex items-center text-white font-semibold text-lg mb-3">
                  <Image className="h-5 w-5 mr-2 text-green-400" />
                  Thumbnail (Optional)
                </label>

                {thumbnail ? (
                  <div className="bg-white/5 border border-white/20 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Image className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {thumbnail.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {(thumbnail.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("thumbnail")}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/30 hover:border-white/50 rounded-lg p-6 text-center transition-all duration-300">
                    <Image className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-white mb-2">Upload a thumbnail image</p>
                    <label className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 inline-block">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isUploading || !title || !description || !video}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                    isUploading || !title || !description || !video
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white hover:scale-105 shadow-lg"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <UploadIcon className="h-5 w-5" />
                      <span>Upload Video</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Upload Tips */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Video Quality</h3>
            <p className="text-gray-400 text-sm">
              Upload videos in HD (1080p) or higher for the best viewing
              experience.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Descriptions</h3>
            <p className="text-gray-400 text-sm">
              Write detailed descriptions to help viewers discover your content.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Image className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Thumbnails</h3>
            <p className="text-gray-400 text-sm">
              Eye-catching thumbnails increase your video's click-through rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
