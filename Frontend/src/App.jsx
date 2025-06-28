import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Upload from "./Pages/Upload.jsx";
import Watch from "./Pages/Watch.jsx";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
