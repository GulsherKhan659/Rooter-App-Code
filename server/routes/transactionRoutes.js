const express = require("express");
const Transaction = require("../models/Transactions");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user, amount, type } = req.body;
    const transaction = new Transaction({ user, amount, type, status: "completed" });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; 

    const totalTransactions = await Transaction.countDocuments();
    const transactions = await Transaction.find()
      .populate("user")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({
      transactions,
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId }).populate("user");
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
