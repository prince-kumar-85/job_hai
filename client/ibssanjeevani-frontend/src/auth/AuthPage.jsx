import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    login({ name, role });

    navigate(role === "admin" ? "/admin" : "/user");
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
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />

      <TextField
        select
        fullWidth
        label="Role"
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

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
