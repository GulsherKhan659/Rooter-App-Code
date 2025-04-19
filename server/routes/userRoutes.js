const express = require("express");
const User = require("../models/User");
const Wallet = require("../models/Wallet");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      const usersWithWallet = await Promise.all(
        users.map(async (user) => {
          const wallet = await Wallet.findOne({ user: user._id }); 
          return {
            ...user.toObject(),
            walletAmount: wallet ? wallet.amount : 0,
          };
        })
      );
      res.json(usersWithWallet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.put("/toggle-active/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: "User status updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
