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
        background: "linear-gradient(180deg, #f8fafc 0%, #e0e7ef 100%)",
        borderRight: 1,
        borderColor: "divider",
        py: 2,
        px: 1,
        position: "fixed",
        top: 64, // height of navbar
        left: 0,
        zIndex: 100,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          color: "primary.main",
          mb: 2,
          ml: 2,
        }}
      >
        Menu
      </Typography>
      <List>
        {sidebarItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.label}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color:
                  location.pathname === item.path
                    ? "primary.main"
                    : "text.primary",
                background:
                  location.pathname === item.path
                    ? "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)"
                    : "transparent",
                "&:hover": {
                  background: "rgba(99,102,241,0.08)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "#fff" : "inherit",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  color: location.pathname === item.path ? "#fff" : "inherit",
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        {secondaryItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.label}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: "text.secondary",
                "&:hover": {
                  background: "rgba(99,102,241,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
