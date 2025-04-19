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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { API_BASE_URL } from "./../../config";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [page, limit]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions?page=${page}&limit=${limit}`);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
      setTotalTransactions(response.data.totalTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Transactions
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <Typography variant="h6">
          Total Transactions: <strong>{totalTransactions}</strong>
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
              <TableCell><strong>Transaction ID</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn._id}>
                <TableCell>{txn._id}</TableCell>
                <TableCell>{txn.user?.name || "Unknown"}</TableCell>
                <TableCell>{txn.user?.email || "N/A"}</TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell>₹{txn.amount}</TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>{txn.payment}</TableCell>
                <TableCell>{txn.status}</TableCell>
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

export default Transactions;
