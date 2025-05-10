const mongoose = require("mongoose");
const Video = require("./models/Video"); // Adjust path as needed
const Channel = require("./models/Channel"); // Adjust path as needed

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/streamvidz";

const videos = [
  {
    title: "Building a Modern React Application",
    description:
      "Learn how to build a full-stack React application with modern tools and best practices.",
    thumbnailUrl: "https://picsum.photos/seed/react1/640/360",
    duration: "12:34",
    views: 156000,
    createdAt: new Date("2024-02-15T10:30:00Z"),
    category: "Web Development",
    channel: null, // Will be set after channel creation
  },
  // ...add more videos as needed
];

const channels = [
  {
    name: "CodeMaster",
    description: "Teaching coding through practical projects",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    bannerUrl: "https://picsum.photos/1920/1080",
    subscribers: 250000,
    totalViews: 15000000,
    joinedDate: new Date("2020-01-01T00:00:00Z"),
  },
  // ...add more channels as needed
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Video.deleteMany({});
  await Channel.deleteMany({});

  const createdChannels = await Channel.insertMany(channels);

  // Assign channel references to videos
  videos.forEach((video, idx) => {
    video.channel = createdChannels[0]._id; // or assign by logic
  });

  await Video.insertMany(videos);

  console.log("Database seeded!");
  mongoose.disconnect();
}

seed();
