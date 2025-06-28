import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">StreamVidz</div>
      <Link to="/" className="hover:text-blue-400 transition text-white">
        Home
      </Link>
      <Link to="/upload" className="hover:text-blue-400 transition text-white">
        Upload
      </Link>
    </nav>
  );
}

export default Navbar;
