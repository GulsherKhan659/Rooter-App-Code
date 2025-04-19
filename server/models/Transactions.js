const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: {type: String, required: true},
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending", required: true  },
  payment: {type: String, enum: ["wallet", "bank"], default: "wallet", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Transactions || mongoose.model("Transactions", TransactionsSchema);