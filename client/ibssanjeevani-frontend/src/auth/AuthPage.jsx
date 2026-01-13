import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = isRegister
        ? await registerUser(form)
        : await loginUser(form);

      login(data);

      navigate(data.user.role === "ADMIN" ? "/admin" : "/user");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ width: 350, mx: "auto", mt: 8 }}>
      <Typography variant="h5" align="center">
        {isRegister ? "Register" : "Login"}
      </Typography>

      {isRegister && (
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

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        {isRegister ? "Register" : "Login"}
      </Button>

      <Button fullWidth sx={{ mt: 1 }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </Button>
    </Box>
  );
};

export default AuthPage;
