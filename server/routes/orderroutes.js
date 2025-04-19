const express = require("express");
const Order = require("../models/Order");
const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Transactions = require("../models/Transactions");

const router = express.Router();

router.post("/placeOrder", async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction(); 

  try {
    const { userId, productId, amount, payment, paymentDetails } = req.body;

    if (!userId || !productId || !amount || !payment) {
      await session.abortTransaction();
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    let transaction;
    
    if (payment === "viaWallet") {
      const wallet = await Wallet.findOne({ user: userId }).session(session);

      if (!wallet || wallet.amount < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient wallet balance" });
      }

      wallet.amount -= amount;
      await wallet.save({ session });

      transaction = new Transactions({
        user: userId,
        amount: amount,
        type: "debit",
        description: `Order payment via Wallet for product ${productId}`,
        status: "completed",
        payment: "wallet",
      });

    } else if (payment === "viaBank") {
      if (!paymentDetails || Object.keys(paymentDetails).length === 0) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Payment details required for bank payment" });
      }

      console.log("Processing bank payment with details:", paymentDetails);

      transaction = new Transactions({
        user: userId,
        amount: amount,
        type: "debit",
        description: `Order payment via Bank for product ${productId}`,
        status: "completed",
        payment: "bank",
      });
    }

    const newOrder = new Order({
      product: productId,
      user: userId,
      amount,
      payment: payment,
      paymentDetails: paymentDetails,
      createdAt: new Date(),
    });

    await newOrder.save({ session });
    await transaction.save({ session });

    await session.commitTransaction(); 
    session.endSession();

    res.status(201).json({ message: "Order placed successfully", order: newOrder, transaction });

  } catch (error) {
    await session.abortTransaction(); 
    session.endSession();
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("product", "productName")
      .populate("user", "name")
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      orders,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("product").populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
