const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db.js");
const errorHandler = require("./src/middleware/errorHandler.js");

// Route imports
const authRoutes = require("./src/routes/auth.js");
const userRoutes = require("./src/routes/users.js");
const productRoutes = require("./src/routes/products.js");
const cartRoutes = require("./src/routes/cart.js");
const orderRoutes = require("./src/routes/orders.js");
const addressRoutes = require("./src/routes/addresses.js");
const paymentRoutes = require("./src/routes/payments.js");
const adminRoutes = require("./src/routes/admin.js");

// Connect DB
connectDB();

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://www.avrotide.xyz",
  "https://avrotide.xyz"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(...process.env.CLIENT_URL.split(',').map(o => o.trim()));
}

app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? true : allowedOrigins,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

// Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "ShopEasy API is running",
    env: process.env.NODE_ENV,
  });
});

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopEasy API is live!",
    docs: "/api/health",
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

module.exports = app;