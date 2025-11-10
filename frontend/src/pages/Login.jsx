import React, { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", values);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box maxWidth={350} mx="auto" mt={8} p={3} borderRadius={2} boxShadow={2}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <TextField fullWidth name="email" label="Email" margin="normal" value={values.email} onChange={onChange} type="email" required />
        <TextField fullWidth name="password" label="Password" margin="normal" value={values.password} onChange={onChange} type="password" required />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Login</Button>
      </form>
      <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/signup")}>Don't have an account? Register</Button>
    </Box>
  );
};

export default Login;