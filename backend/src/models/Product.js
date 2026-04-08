const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true },

  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },

  // ✔ FIXED NAME
  finalPrice: { type: Number, default: 0 },

  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String },
    }
  ],

  category: { type: String, required: true },
  salesCount: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },

  sizes: [{ type: String }],
  colors: [{ type: String }],
  material: { type: String },
  fit: { type: String },
  occasion: { type: String },

  reviews: [reviewSchema],
  numReviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);