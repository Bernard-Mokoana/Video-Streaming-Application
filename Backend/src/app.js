import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Allow requests from the specified origin
        credentials: true // Allow sending cookies with requests
    })
);

// Common middleware
app.use(express.json({ limit: "16kb" })); // Parse JSON requests with a size limit
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(cookieParser()); // Parse cookies from incoming requests

// Import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"; // Health check route
import userRouter from "./routes/user.routes.js"; // User-related routes
import { errorHandler } from "./middleware/error.middlewares.js"; // Global error handler
import tweetRouter from "./routes/tweet.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

// Define routes
app.use("/api/v1/healthcheck", healthcheckRouter); // Health check endpoint
app.use("/api/v1/users", userRouter); // User-related endpoints
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/subscription", subscriptionRouter);

// Global error handler middleware
app.use(errorHandler);

export { app }; // Export the app instance
