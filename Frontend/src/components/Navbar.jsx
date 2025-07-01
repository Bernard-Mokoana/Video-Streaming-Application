import React, { useState } from "react";
import { ChevronDown, Menu, X, Search } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mb-8">
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 italic">
                Streamvidz
              </h1>
            </div>

            {/* Desktop Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="/"
                className="text-gray -900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="/upload"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Upload
              </a>
              <a
                href="/playlist"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Playlist
              </a>

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  More
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <a
                      href="/category"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Category
                    </a>
                    <a
                      href="/subscription"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Subscription
                    </a>
                    <a
                      href="/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      History
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Auth Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3 ml-4">
              <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                Login
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 p-2 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/"
                  className="block text-gray-900 hover:text-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Home
                </a>
                <a
                  href="/upload"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Upload
                </a>
                <a
                  href="/playlist"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Playlist
                </a>
                <a
                  href="/category"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Category
                </a>
                <a
                  href="/subscription"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Subscription
                </a>
                <a
                  href="/history"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  History
                </a>
                <a
                  href="/settings"
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  Settings
                </a>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex flex-col space-y-2">
                    <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium text-left transition-colors rounded-md hover:bg-white/10">
                      Login
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
