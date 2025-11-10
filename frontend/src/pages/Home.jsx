import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import InventoryTable from "../components/InventoryTable";

const Home = () => {
  const { user, logout } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  const fetchInventory = async () => {
    try {
      const res = await api.get("/inventory");
      setInventory(res.data);
    } catch (err) {
      setError("Failed to load inventory");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (item) => {
    try {
      await api.post("/inventory", item);
      fetchInventory();
    } catch {
      setError("Failed to add item (Admins only)");
    }
  };

  const handleUpdate = async (id, item) => {
    try {
      await api.put(`/inventory/${id}`, item);
      fetchInventory();
    } catch {
      setError("Failed to update item (Admins only)");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      fetchInventory();
    } catch {
      setError("Failed to delete item (Admins only)");
    }
  };

  return (
    <Box maxWidth={900} mx="auto" mt={5}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" mb={2}>
          Welcome, {user.name}! Inventory Dashboard
        </Typography>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <InventoryTable
        inventory={inventory}
        isAdmin={user.role === "admin"}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Home;