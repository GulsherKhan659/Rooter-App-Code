const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const categoryRotes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
const autRoute = require("./routes/auth");
const orderRoutes = require("./routes/orderroutes");
const mediaRoutes = require("./routes/mediaRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/products", productRoutes);
app.use("/categories", categoryRotes);
app.use('/auth', autRoute);
app.use("/transactions", transactionRoutes);
app.use("/wallet", walletRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/media", mediaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
