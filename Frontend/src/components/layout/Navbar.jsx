import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Badge,
  Tooltip,
} from "@mui/material";
import { SearchBar } from "../index";
import { logout } from "../auth/authSlice";
import {
  VideoCall,
  NotificationsNone,
  Menu as MenuIcon,
  DarkMode,
  AccountCircle,
  Upload,
} from "@mui/icons-material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <Toolbar className="justify-between px-4 h-16">
        {/* Left Section */}
        <Box className="flex items-center gap-4">
          <IconButton className="lg:hidden text-gray-700 dark:text-gray-200">
            <MenuIcon />
          </IconButton>
          <Link to="/" className="flex items-center gap-3">
            {/* <img src="/logo.png" alt="StreamVidz" className="h-8 w-auto" /> */}
            <span className="text-xl font-bold hidden sm:block bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
              StreamVidz
            </span>
          </Link>
        </Box>

        {/* Center Section - Search */}
        <Box className="flex">
          <SearchBar />
        </Box>

        {/* Right Section */}
        <Box className="flex items-center gap-2">
          <Tooltip title="Toggle dark mode">
            <IconButton className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              <DarkMode />
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <>
              <Tooltip title="Upload video">
                <IconButton
                  className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => navigate("/upload")}
                >
                  <Upload />
                </IconButton>
              </Tooltip>

              <Tooltip title="Create">
                <IconButton className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <VideoCall />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Badge badgeContent={3} color="error">
                    <NotificationsNone />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box className="relative">
                <IconButton
                  onClick={handleMenuOpen}
                  className="hover:ring-2 hover:ring-blue-500 rounded-full transition-all"
                >
                  <Avatar
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-8 h-8 ring-2 ring-gray-200 dark:ring-gray-700"
                  >
                    {user?.username?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  className="mt-2"
                  PaperProps={{
                    className: "bg-white dark:bg-gray-800 shadow-xl rounded-xl",
                  }}
                >
                  <MenuItem
                    onClick={() => navigate(`/channel/${user?.id}`)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <AccountCircle className="mr-2" /> My Channel
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/studio")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <VideoCall className="mr-2" /> Creator Studio
                  </MenuItem>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                  <MenuItem
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium"
              startIcon={<AccountCircle />}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
