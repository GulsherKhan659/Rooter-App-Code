// db.js
const mongoose = require('mongoose');
/**
 * Connect to MongoDB
 * @param {string} uri - The MongoDB connection string
 */
async function connectDB(uri) {
  try {
    console.log(uri);
    await mongoose.connect(  
        
        "mongodb+srv://khandb481:UjPI3UkroC8TPNNm@cluster0.nysdv.mongodb.net/"

  );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); 
  }
}

module.exports = connectDB;
