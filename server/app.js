// app.js
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const Product = require('./models/Product');
const Category = require('./models/Category');
const connectDB = require('./configue/DBConnection');

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// 1) Configure and serve "uploads" folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2) Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to 'uploads' directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // e.g. 1677012345678-originalfilename.jpg
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// Connect to MongoDB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI);
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from MongoDB E-commerce on Atlas');
});

/** 
 * -----------------------------------
 *  CATEGORY ROUTES
 * -----------------------------------
 */

// GET all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST (create) a category with optional mainImage upload
// Use 'upload.single("mainImage")' if your form name is 'mainImage'
app.post('/categories', upload.single('mainImage'), async (req, res) => {
  try {
    const { name, description, parent } = req.body;

    // If you have an uploaded file, use its path; otherwise empty string
    const mainImagePath = req.file ? req.file.path : '';

    const newCategory = await Category.create({
      name,
      description,
      parent: parent || null,
      mainImage: mainImagePath
    });

    res.json({ message: 'Category created', category: newCategory });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * -----------------------------------
 *  PRODUCT ROUTES
 * -----------------------------------
 */

// GET all products
app.get('/products', async (req, res) => {
  try {
    // Populate category details
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST (create) a product with mainImage + multiple sliderImages
// Expect front-end form fields: "mainImage" (single) and "sliderImages" (multiple)
debugger
app.post(
  '/products',
  upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]),
  
  async (req, res) => {
    console.log(req.body)
    try {
      // Destructure fields from body
      const { productName, category, prices } = req.body;

      // Retrieve uploaded files
      const mainImageFile = req.files['productImage'] ? req.files['productImage'][0] : null;
      const sliderImageFiles = req.files['images'] || [];

      // Generate path strings
      const mainImagePath = mainImageFile ? mainImageFile.path : '';
      const sliderImagesPaths = sliderImageFiles.map(file => file.path);

      // Parse prices array (as it's received as a string from FormData)
      const parsedPrices = JSON.parse(prices || '[]');

      const newProduct = new Product({
        name: productName,
        category,
        mainImage: mainImagePath,
        sliderImages: sliderImagesPaths,
        prices: parsedPrices,
      });

      const savedProduct = await newProduct.save();
      res.json({ message: 'Product created', product: savedProduct });
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
);


 
