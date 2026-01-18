import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  loginUser,
  registerUser,
  loginAdmin,
  registerAdmin,
} from "../services/authService";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("user"); // user | admin

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    let data;

    if (role === "admin") {
      data =
        mode === "register"
          ? await registerAdmin(form)
          : await loginAdmin(form);
    } else {
      data =
        mode === "register"
          ? await registerUser(form)
          : await loginUser(form);
    }

    if (!data?.token || !data?.user) {
      throw new Error("Invalid server response");
    }

    login(data.token, data.user);

    navigate(data.user.role === "admin" ? "/admin" : "/user");
  } catch (err) {
    alert(err.response?.data?.message || err.message || "Something went wrong");
  }
};



  return (
    <Box sx={{ width: 360, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {mode === "login" ? "Login" : "Register"} as {role.toUpperCase()}
      </Typography>

      {/* MODE BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          fullWidth
          variant={mode === "login" ? "contained" : "outlined"}
          onClick={() => setMode("login")}
        >
          Login
        </Button>

        <Button
          fullWidth
          variant={mode === "register" ? "contained" : "outlined"}
          onClick={() => setMode("register")}
        >
          Register
        </Button>
      </Box>

      {/* ROLE BUTTONS */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          fullWidth
          color="secondary"
          variant={role === "user" ? "contained" : "outlined"}
          onClick={() => setRole("user")}
        >
          User
        </Button>

        <Button
          fullWidth
          color="secondary"
          variant={role === "admin" ? "contained" : "outlined"}
          onClick={() => setRole("admin")}
        >
          Admin
        </Button>
      </Box>

      {/* FORM */}
      {mode === "register" && (
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        {mode === "login" ? "Login" : "Register"} as {role.toUpperCase()}
      </Button>
    </Box>
  );
};

export default AuthPage;
