const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Category', categorySchema);
