import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Upload from "./Pages/Upload.jsx";
import Watch from "./Pages/Watch.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
