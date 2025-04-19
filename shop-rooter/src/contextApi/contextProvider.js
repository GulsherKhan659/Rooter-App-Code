import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const WalletContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [walletAmount, setWalletAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetchWalletAmount();
      fetchUserTransactions();
      fetchTransactions();
    }
  }, [userDetails]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
      setFilteredProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchProducts = (query) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const fetchWalletAmount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/wallet/getAmount/${userDetails._id}`
      );
      if (response.data && response.data.length > 0) {
        setWalletAmount(response.data[0].amount);
      } else {
        setWalletAmount(0);
      }
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/${userDetails._id}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      setAllTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const addedAmount = async (amountMoney) => {
    if (!userDetails) {
      console.error("User not found.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/wallet/addAmount",
        {
          userId: userDetails._id,
          amount: amountMoney,
        }
      );

      alert("Money added successfully!");
      fetchWalletAmount();
    } catch (error) {
      console.error(
        "Error adding money:",
        error.response?.data || error.message
      );
      alert("Failed to add money. Try again.");
    }
  };

  const placeOrder = async (orderData) => {
    const payload = {
      userId: userDetails._id,
      productId: orderData.productId,
      amount: orderData.amount,
      payment: orderData.payment,
      paymentDetails: orderData.paymentDetails,
    };
    if (!userDetails) {
      console.error("User not found.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/orders/placeOrder",
        JSON.stringify(payload),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Order placed successfully!");
      fetchWalletAmount();
      fetchTransactions();
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert("Failed to place order. Try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user"); 
    setUserDetails(null); 
    window.location.href = "/"; 
  };
  

  return (
    <WalletContext.Provider
      value={{
        userDetails,
        walletAmount,
        transactions,
        fetchWalletAmount,
        allTransactions,
        addedAmount,
        placeOrder,
        products: filteredProducts,
        searchProducts,
        logout,
        setUserDetails
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
