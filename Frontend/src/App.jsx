import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
function App() {
  <BrowserRouter>
    <Box sx={{ background: "#000" }}>
      {/* </Navbar> */}
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" exact element={<ChannelDetail />} />
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
