const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  addReview,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/:id/reviews", protect, addReview);

// Admin routes
router.post("/", protect, adminOnly, upload.array("images", 5), createProduct);
router.put("/:id", protect, adminOnly, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.delete("/:id/images/:imageId", protect, adminOnly, deleteProductImage);

module.exports = router;