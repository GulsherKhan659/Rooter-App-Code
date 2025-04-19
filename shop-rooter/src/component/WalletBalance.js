import React, { use, useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { WalletContext } from "../contextApi/contextProvider";


const WalletBalance = () => {
  const {walletAmount} = useContext(WalletContext);
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();


  useEffect(()=> {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[]);

  useEffect(() => {
    if (user) {
      fetchWalletAmount();
    }
  },[user]);

  const fetchWalletAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/wallet/getAmount/${user._id}`
      );
      console.log("amountBalance..........................",response)
      if (response.data && response.data.length > 0) {
        setBalance(response.data[0].amount);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };


  return (
    <Card className="bg-success text-white mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>Wallet Balance</Card.Title>
          <h2>₹{walletAmount}</h2>
        </div>
        <Button
          onClick={() => {
            navigate("/addmoney");
          }}
          variant="light"
          className="text-success"
        >
          Add Money
        </Button>
      </Card.Body>
    </Card>
  );
};

export default WalletBalance;
