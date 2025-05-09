import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import { authAPI } from "../../api/endpoints";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await authAPI.login(formData);
      dispatch(loginSuccess(response));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <Paper className="p-8 w-full max-w-md">
        <Typography variant="h5" className="text-center mb-6">
          Login to StreamVidz
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography className="text-center mt-4">
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/register")}
              className="text-blue-600"
            >
              Register
            </Button>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
