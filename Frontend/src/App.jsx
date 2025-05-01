import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  ChannelDetails,
  VideoDetails,
  SearchFeed,
} from "./components/index.js";
function App() {
  <BrowserRouter>
    <Box sx={{ background: "#000" }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/channel/:id" exact element={<ChannelDetails />} />
        <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>;
}

export default App;

// import { Provider } from "react-redux";
// import { store } from "./app/store.js";

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-gray-900 text-white">
//         <Navbar />
//       </div>
//     </Provider>
//   );
// }

// export default App;
