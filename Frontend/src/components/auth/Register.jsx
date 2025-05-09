import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "./authSlice";
import { authAPI } from "../../api/endpoints";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError("");
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
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
          Create an Account
        </Typography>

        {(error || validationError) && (
          <Alert severity="error" className="mb-4">
            {error || validationError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

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

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
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
            {loading ? "Creating Account..." : "Register"}
          </Button>

          <Typography className="text-center mt-4">
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              className="text-blue-600"
            >
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
