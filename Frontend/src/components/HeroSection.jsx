import React from "react";
import { Play, Search } from "lucide-react";
import Navbar from "./Navbar";

function HeroSection() {
  const handleNavigation = (path) => {
    window.location.href = path;
  };
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Background Image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 \">
        {/* Navbar */}
        <Navbar />
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Discover your Next
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Favorite Video Today
                </span>
              </h1>

              <p>
                Explore a diverse collection of trending, recommended, and
                popular videos tailored just for you. Dive into captivating
                content that keeps you entertained and informed.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleNavigation("../Pages/Home.jsx")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Play className="h-5 w-5" />
                <span>Watch</span>
              </button>

              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105">
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">10M+</div>
                <div className="text-gray-400">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">5M+</div>
                <div className="text-gray-400">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99%</div>
                <div className="text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          {/*  Right Content - Video Preview Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Video Card 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                  <Play className="h-8 w-9 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Tech Trends 2025
                </h3>
                <p className="text-gray-300 text-xs">2.1M views</p>
              </div>

              {/* Video Card 2 */}

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 mt-8">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mb-3 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Creative Inspiration
                </h3>
                <p className="text-gray-300 text-xs">892K views</p>
              </div>

              {/* Video Card 3*/}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-md flex items-center justify-center">
                  <Play className="h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm m-1">
                  Cooking Masterclass
                </h3>
                <p className="text-gray-300 m-1 text-xs">3.2M views</p>
              </div>

              {/* Video Card 4 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 mt-8">
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg mb-3 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Travel Adventures
                </h3>
                <p className="text-gray-300 text-xs">3.2M views</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top -left-4 w-20 bg-blue-500/20 rounded-full blur-xl">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
