import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import {
  Navbar,
  Feed,
  ChannelDetails,
  VideoDetails,
  SearchFeed,
  SideBar,
} from "./components/index.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box className="bg-gray-700">
          <Navbar />
          <SideBar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/channel/:id" exact element={<ChannelDetails />} />
            <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
