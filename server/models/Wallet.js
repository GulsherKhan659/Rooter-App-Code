const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Wallet", walletSchema);