const express = require("express");
const admin = require("../firebase")
const User = require("../models/User");
const router = express.Router();

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

router.post("/google-login", verifyToken, async (req, res) => {

  try {
    const { uid, name, email, picture } = req.user;

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, name, email, picture, isActive: true });
      await user.save();
    }

    res.json({ message: "User authenticated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error saving user to database" });
  }
});

module.exports = router;
