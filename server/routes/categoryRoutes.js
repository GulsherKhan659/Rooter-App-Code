const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Category = require("../models/Category");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("mainImage"), async (req, res) => {
  try {
    const { categoryName } = req.body;
    const mainImage = req.file ? `/uploads/${req.file.filename}` : ""; 

    if (!categoryName || !mainImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCategory = new Category({ categoryName, mainImage });
    await newCategory.save();

    res.status(201).json({ message: "Category saved", category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
