const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true},
  mainImage: { type: String, required: true },
  sliderImages: [{ type: String }],
  prices: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
    },
  ],
  checkboxes: [{
    phoneNumber: {type: Boolean},
    email: {type: Boolean},
    playerId: {type: Boolean},
    messageBox: {type: Boolean},
  }]
});


module.exports = mongoose.model("Product", ProductSchema);
