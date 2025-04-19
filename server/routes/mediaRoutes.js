const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Media = require("../models/Media");

const router = express.Router();

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

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const newMedia = new Media({ imageUrl });
    await newMedia.save();

    res.status(201).json({ message: "Image uploaded", media: newMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.get("/", async (req, res) => {
  try {
    const images = await Media.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  const imageId = req.params.id;

  try {
    const image = await Media.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join(__dirname, "../uploads", path.basename(image.imageUrl));
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting file" });
      }

      Media.findByIdAndDelete(imageId)
        .then(() => {
          res.status(200).json({ message: "Image deleted successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error deleting image record", error: err });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
