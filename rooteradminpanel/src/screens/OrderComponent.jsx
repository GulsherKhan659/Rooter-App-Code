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
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material"; 
import { API_BASE_URL } from "./../../config";

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders?page=${page}&limit=${limit}`);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders List
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <Typography variant="h6">
          Total Orders: <strong>{totalOrders}</strong>
        </Typography>
        <FormControl variant="outlined" size="small">
          <InputLabel>Records per Page</InputLabel>
          <Select
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
            label="Records per Page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Payment Method</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user?.name || "N/A"}</TableCell>
                <TableCell>{order.product?.productName || "N/A"}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <IconButton 
          color="primary" 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </Typography>
        <IconButton 
          color="primary" 
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default OrderComponent;
