const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([{ name: "mainImage" }, { name: "sliderImages" }]), async (req, res) => {
  try {
    const { productName, category,description, prices, checkboxes  } = req.body;
    const mainImage = req.files["mainImage"] ? req.files["mainImage"][0].path : "";
    const sliderImages = req.files["sliderImages"] ? req.files["sliderImages"].map(file => file.path) : [];
    const newProduct = new Product({
      productName,
      category,
      description,
      mainImage,
      sliderImages,
      prices: JSON.parse(prices),
      checkboxes: JSON.parse(checkboxes),

    });

    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully!", product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId }); // Assuming _id is the product identifier

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
