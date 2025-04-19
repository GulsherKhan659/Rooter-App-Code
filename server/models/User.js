const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  picture: String,
  createdAt: {type: Date,default: Date.now},
  updatedAt: {type: Date,default: Date.now},
  phone: String,
  isActive: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;