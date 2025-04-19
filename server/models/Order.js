const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  payment: { type: String, enum: ["viaWallet", "viaBank"], default: "viaWallet", required: true },
  paymentDetails: { type: Object, default: {} }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
