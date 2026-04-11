
// -----------------------------------------
// CREATE PRODUCT
const Product = require("../models/Product");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
// -----------------------------------------
const createProduct = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);
    const {
      name,
      price,
      discount,
      description,
      category,
      stock,
      images,
      sizes,
      colors,
      material,
      fit,
      occasion,
    } = req.body;

    // REQUIRED FIELDS CHECK (schema ke hisab se)
    if (!name || !price || !category || !description) {
      return res.status(400).json({
        message: "Name, price, category and description are required",
      });
    }

    // FINAL PRICE CALCULATION
    let finalPrice =
      Number(price) - (Number(price) * Number(discount || 0)) / 100;

    finalPrice = Math.round(finalPrice / 100) * 100;

    // IMAGES FIX — convert to { url }
    // IMAGES FIX — multer files se read karo
    let imagesArray = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Upload buffer from memory storage to Cloudinary
        const result = await uploadToCloudinary(file.buffer, 'ecommerce/products');
        imagesArray.push({
          url: result.url,
          public_id: result.public_id
        });
      }
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount: discount || 0,
      finalPrice,
      category,
      stock: stock || 0,
      images: imagesArray,
      sizes: sizes || [],
      colors: colors || [],
      material,
      fit,
      occasion,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// -----------------------------------------
// UPDATE PRODUCT
// -----------------------------------------
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Handle new images & deletions
    let currentImages = [...product.images];
    if (updates.deleteImages) {
      const deleteIds = Array.isArray(updates.deleteImages) ? updates.deleteImages : [updates.deleteImages];
      for (const delId of deleteIds) {
        const imgToDelete = currentImages.find(img => String(img._id) === String(delId));
        if (imgToDelete && imgToDelete.public_id) {
          await deleteFromCloudinary(imgToDelete.public_id);
        }
      }
      currentImages = currentImages.filter(img => !deleteIds.includes(String(img._id)));
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, 'ecommerce/products');
        currentImages.push({
          url: result.url,
          public_id: result.public_id
        });
      }
    }
    updates.images = currentImages;

    if (updates.price !== undefined || updates.discount !== undefined) {
      const newPrice =
        updates.price !== undefined
          ? Number(updates.price)
          : Number(product.price);
      const newDiscount =
        updates.discount !== undefined
          ? Number(updates.discount)
          : Number(product.discount);

      let final = newPrice - (newPrice * newDiscount) / 100;
      updates.finalPrice = Math.round(final / 100) * 100;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// -----------------------------------------
// GET ALL PRODUCTS
// -----------------------------------------
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
      meta: {
        total: products.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
};
// -----------------------------------------
// GET SINGLE PRODUCT
// -----------------------------------------
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// -----------------------------------------
// DELETE PRODUCT
// -----------------------------------------
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    for (const img of product.images) {
      if (img.public_id) await deleteFromCloudinary(img.public_id);
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// --------------image ---------------------------
const deleteProductImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imgToDelete = product.images.find((img) => img._id.toString() === imageId);
    if (imgToDelete && imgToDelete.public_id) {
      await deleteFromCloudinary(imgToDelete.public_id);
    }

    product.images = product.images.filter(
      (img) => img._id.toString() !== imageId,
    );

    await product.save();

    res.json({
      success: true,
      message: "Image deleted",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message,
    });
  }
};

// -----------------------------------------
// ADD REVIEW
// -----------------------------------------
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
  deleteProductImage,
  addReview,
};
