import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full h-fit sticky bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg-:px-8">
          <div className="flex justify-between items-center h-16">
            {/* logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 italic">
                Streamvidz
              </h1>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <Link
                to="/"
                className="block text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/upload"
                className=" text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                to="/playlist"
                className="block text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Playlist
              </Link>
              <Link
                to="/category"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Category
              </Link>
              <Link
                to="/subscription"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Subscription
              </Link>
              <Link
                to="/history"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                History
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Settings
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium">
                    Login
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-base font-medium">
                    Sign Up
                  </button>
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
