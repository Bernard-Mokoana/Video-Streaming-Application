import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Upload from "./Pages/Upload.jsx";
import Watch from "./Pages/Watch.jsx";
import Playlist from "./Pages/Playlist.jsx";
import Subscription from "./Pages/Subscription.jsx";
import Category from "./Pages/Category.jsx";
import History from "./Pages/History.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Settings from "./Pages/Settings.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/category" element={<Category />} />
          <Route path="/history" element={<History />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
