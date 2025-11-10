import React, { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", values);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box maxWidth={350} mx="auto" mt={8} p={3} borderRadius={2} boxShadow={2}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <TextField fullWidth name="name" label="Name" margin="normal" value={values.name} onChange={onChange} required />
        <TextField fullWidth name="email" label="Email" margin="normal" value={values.email} onChange={onChange} type="email" required />
        <TextField fullWidth name="password" label="Password" margin="normal" value={values.password} onChange={onChange} type="password" required />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Register</Button>
      </form>
      <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>Already have an account? Login</Button>
    </Box>
  );
};

export default Signup;