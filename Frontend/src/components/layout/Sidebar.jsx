import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Whatshot,
  Subscriptions,
  VideoLibrary,
  History,
  ThumbUp,
  WatchLater,
  Settings,
  HelpOutline,
  ExitToApp,
} from "@mui/icons-material";

const sidebarItems = [
  { label: "Home", icon: <Home />, path: "/" },
  { label: "Trending", icon: <Whatshot />, path: "/trending" },
  { label: "Subscriptions", icon: <Subscriptions />, path: "/subscriptions" },
  { label: "Library", icon: <VideoLibrary />, path: "/library" },
  { label: "History", icon: <History />, path: "/history" },
  { label: "Liked Videos", icon: <ThumbUp />, path: "/liked" },
  { label: "Watch Later", icon: <WatchLater />, path: "/watch-later" },
];

const secondaryItems = [
  { label: "Settings", icon: <Settings />, path: "/settings" },
  { label: "Help", icon: <HelpOutline />, path: "/help" },
  { label: "Logout", icon: <ExitToApp />, path: "/logout" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      className="hidden md:flex flex-col"
      sx={{
        width: 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #6366f1 0%, #a21caf 100%)",
        borderRight: 0,
        py: 3,
        px: 2,
        position: "fixed",
        top: 64, // height of navbar
        left: 0,
        zIndex: 1200,
        boxShadow: 6,
        animation: "slideInSidebar 0.7s cubic-bezier(.4,2,.6,1)",
        "@keyframes slideInSidebar": {
          from: { transform: "translateX(-100%)", opacity: 0 },
          to: { transform: "none", opacity: 1 },
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          letterSpacing: 2,
          color: "#fff",
          mb: 3,
          ml: 1,
          textShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Menu
      </Typography>
      <List>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip title={item.label} placement="right" key={item.label}>
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 3,
                  mb: 0.5,
                  color: isActive ? "#fff" : "#e0e7ef",
                  background: isActive
                    ? "linear-gradient(90deg, #6366f1 0%, #a21caf 100%)"
                    : "transparent",
                  boxShadow: isActive ? "0 2px 12px 0 #a21caf44" : "none",
                  borderLeft: isActive
                    ? "5px solid #fff"
                    : "5px solid transparent",
                  transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #a21caf 100%)",
                    color: "#fff",
                    transform: "translateX(4px) scale(1.03)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#fff" : "#e0e7ef",
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 800 : 500,
                    color: isActive ? "#fff" : "#e0e7ef",
                  }}
                />
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
      <Divider sx={{ my: 2, borderColor: "#fff2" }} />
      <List>
        {secondaryItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.label}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                color: "#e0e7ef",
                background: "transparent",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #a21caf 100%)",
                  color: "#fff",
                  transform: "translateX(4px) scale(1.03)",
                },
                transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "#e0e7ef" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
