import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { API_BASE_URL } from "./../../config";

const UserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/users/toggle-active/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div>
     <Typography variant="h4" gutterBottom>
        Users List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Wallet Balance</strong></TableCell>
              <TableCell><strong>Creation Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || "N/A"}</TableCell>
                <TableCell>₹{user.walletAmount}</TableCell>
                <TableCell>{user.createdAt || "N/A"}</TableCell>
                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => toggleUserStatus(user._id)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </Button>{" "}
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserComponent;
