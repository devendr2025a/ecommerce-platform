
// -----------------------------------------
const mongoose = require("mongoose");
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
    const { category, search, brand, isFeaturedDeal, minPrice, maxPrice, sort, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (category) {
      filter.$or = [
        { categorySlug: category },
        { category: new RegExp(category.replace(/-/g, " "), "i") },
      ];
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    if (brand) {
      filter.brand = new RegExp(`^${brand}$`, "i");
    }

    if (isFeaturedDeal === "true") {
      filter.isFeaturedDeal = true;
    }

    if (minPrice || maxPrice) {
      filter.finalPrice = {};
      if (minPrice) filter.finalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.finalPrice.$lte = Number(maxPrice);
    }

    let sortQuery = { isFeaturedDeal: -1, createdAt: 1 };
    if (sort === "price-asc") sortQuery = { finalPrice: 1 };
    if (sort === "price-desc") sortQuery = { finalPrice: -1 };
    if (sort === "discount-desc") sortQuery = { discount: -1 };
    if (sort === "name-asc") sortQuery = { name: 1 };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortQuery)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      success: true,
      products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
// -----------------------------------------
// GET SINGLE PRODUCT
// -----------------------------------------
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ $or: [{ slug: id }, { customId: id }, { _id: id }] }).catch(() => null);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found", error: error.message });
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
 
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // 🔥 YEH ADD KARO - Validation check
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: "Rating must be between 1 and 5" 
      });
    }
    
    if (!comment || comment.trim() === '') {
      return res.status(400).json({ 
        message: "Comment is required" 
      });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed
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
      comment: comment.trim(), // Trim the comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    // 🔥 YEH BHI ADD KARO - Return the updated product
    res.status(201).json({ 
      message: "Review added successfully",
      success: true,
      product: product // Return updated product
    });
    
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ 
      message: "Error adding review", 
      error: error.message 
    });
  }
};

// -----------------------------------------
// GET GROCERY HOMEPAGE DATA & IMAGES
// -----------------------------------------
// -----------------------------------------
// GET GROCERY HOMEPAGE DATA & IMAGES (Backend Served)
// -----------------------------------------
const getGroceryHomepage = async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const baseUrl = `${protocol}://${host}`;

    // 1. Hero Banner
    const heroBanner = {
      image: `${baseUrl}/images/blinkit/hero_banner_ultra_hd.png`,
      link: '/products',
      alt: 'Stock up on daily essentials - Delivering in Lucknow',
    };

    // 2. Promo Cards
    const promoCards = [
      {
        id: 'pharmacy',
        name: 'Pharmacy at your doorstep!',
        image: `${baseUrl}/images/blinkit/promo_card_pharmacy_ultra_hd.png`,
        link: '/products?category=pharma-wellness',
      },
      {
        id: 'pet-care',
        name: 'Pet Care supplies in minutes',
        image: `${baseUrl}/images/blinkit/promo_card_pet_ultra_hd.png`,
        link: '/products?category=pet-care',
      },
      {
        id: 'baby-care',
        name: 'Baby Care essentials delivered fast',
        image: `${baseUrl}/images/blinkit/promo_card_baby_ultra_hd.png`,
        link: '/products?category=baby-care',
      },
    ];

    // 3. Category Header Banner & 20 Categories
    const categoryBanner = {
      image: `${baseUrl}/images/blinkit/cat_header_banner.png`,
      alt: 'Shop by Category - Freshness for a Better You',
    };

    const categoriesRow1 = [
      { id: 'paan-corner', name: 'Paan Corner', image: `${baseUrl}/images/blinkit/new_cat_paan_corner.png`, link: '/products?search=Paan' },
      { id: 'dairy-bread-eggs', name: 'Dairy, Bread & Eggs', image: `${baseUrl}/images/blinkit/new_cat_dairy_bread_eggs.png`, link: '/products?category=dairy-breakfast' },
      { id: 'fruits-vegetables', name: 'Fruits & Vegetables', image: `${baseUrl}/images/blinkit/new_cat_fruits_vegetables.png`, link: '/products?category=fruits-vegetables' },
      { id: 'cold-drinks-juices', name: 'Cold Drinks & Juices', image: `${baseUrl}/images/blinkit/new_cat_cold_drinks_juices.png`, link: '/products?category=beverages' },
      { id: 'snacks-munchies', name: 'Snacks & Munchies', image: `${baseUrl}/images/blinkit/new_cat_snacks_munchies.png`, link: '/products?category=snacks-branded-foods' },
      { id: 'breakfast-instant', name: 'Breakfast & Instant Food', image: `${baseUrl}/images/blinkit/new_cat_breakfast_instant.png`, link: '/products?search=Instant' },
      { id: 'sweet-tooth', name: 'Sweet Tooth', image: `${baseUrl}/images/blinkit/new_cat_sweet_tooth.png`, link: '/products?category=bakery-cakes' },
    ];

    const categoriesRow2 = [
      { id: 'bakery-biscuits', name: 'Bakery & Biscuits', image: `${baseUrl}/images/blinkit/new_cat_bakery_biscuits.png`, link: '/products?search=Bakery' },
      { id: 'tea-coffee', name: 'Tea, Coffee & Milk Drinks', image: `${baseUrl}/images/blinkit/new_cat_tea_coffee.png`, link: '/products?search=Tea' },
      { id: 'atta-rice-dal', name: 'Atta, Rice & Dal', image: `${baseUrl}/images/blinkit/new_cat_atta_rice_dal.png`, link: '/products?search=Atta' },
      { id: 'masala-oil', name: 'Masala, Oil & More', image: `${baseUrl}/images/blinkit/new_cat_masala_oil.png`, link: '/products?search=Masala' },
      { id: 'sauces-spreads', name: 'Sauces & Spreads', image: `${baseUrl}/images/blinkit/new_cat_sauces_spreads.png`, link: '/products?search=Sauce' },
      { id: 'chicken-meat-fish', name: 'Chicken, Meat & Fish', image: `${baseUrl}/images/blinkit/new_cat_chicken_meat_fish.png`, link: '/products?category=meat-seafood' },
      { id: 'organic-healthy', name: 'Organic & Healthy Living', image: `${baseUrl}/images/blinkit/new_cat_organic_healthy.png`, link: '/products?search=Organic' },
    ];

    const categoriesRow3 = [
      { id: 'baby-care', name: 'Baby Care', image: `${baseUrl}/images/blinkit/new_cat_baby_care.png`, link: '/products?category=baby-care' },
      { id: 'pharma-wellness', name: 'Pharma & Wellness', image: `${baseUrl}/images/blinkit/new_cat_pharma_wellness.png`, link: '/products?category=pharma-wellness' },
      { id: 'cleaning-essentials', name: 'Cleaning Essentials', image: `${baseUrl}/images/blinkit/new_cat_cleaning_essentials.png`, link: '/products?category=household-essentials' },
      { id: 'home-office', name: 'Home & Office', image: `${baseUrl}/images/blinkit/new_cat_home_office.png`, link: '/products?search=Office' },
      { id: 'personal-care', name: 'Personal Care', image: `${baseUrl}/images/blinkit/new_cat_personal_care.png`, link: '/products?category=personal-care' },
      { id: 'pet-care', name: 'Pet Care', image: `${baseUrl}/images/blinkit/new_cat_pet_care.png`, link: '/products?category=pet-care' },
    ];

    // 4. Fresh Packaged Milk Range
    const milkSection = {
      banner: `${baseUrl}/images/blinkit/milk_header_banner.png`,
      products: [
        { id: 'milk-mother-dairy-classic-1l', name: 'Mother Dairy Classic Toned Milk', displayName: 'Mother Dairy Classic...', unit: '1 Ltr pouch', price: 60, finalPrice: 57, discount: 5, image: `${baseUrl}/images/blinkit/milk_pouch_1.png` },
        { id: 'milk-amul-taaza-1l', name: 'Amul Taaza Toned Milk', displayName: 'Amul Taaza...', unit: '1 Ltr pouch', price: 56, finalPrice: 54, discount: 4, image: `${baseUrl}/images/blinkit/milk_pouch_2.png` },
        { id: 'milk-nandini-fresh-500ml', name: 'Nandini Fresh Toned Milk', displayName: 'Nandini Fresh Toned Milk', unit: '500 ml pouch', price: 24, finalPrice: 23, discount: 4, image: `${baseUrl}/images/blinkit/milk_pouch_3.png` },
        { id: 'milk-mother-dairy-toned-500ml', name: 'Mother Dairy Toned Milk', displayName: 'Mother Dairy Toned...', unit: '500 ml pouch', price: 28, finalPrice: 27, discount: 4, image: `${baseUrl}/images/blinkit/milk_pouch_4.png` },
        { id: 'milk-mother-dairy-full-cream-500ml', name: 'Mother Dairy Full Cream Milk', displayName: 'Mother Dairy Full Cream Milk', unit: '500 ml pouch', price: 34, finalPrice: 33, discount: 3, image: `${baseUrl}/images/blinkit/milk_pouch_5.png` },
        { id: 'milk-amul-cow-fresh-500ml', name: 'Amul Cow Fresh Milk', displayName: 'Amul Cow Fresh Milk', unit: '500 ml pouch', price: 30, finalPrice: 29, discount: 3, image: `${baseUrl}/images/blinkit/milk_pouch_6.png` },
      ]
    };

    // 5. Best Deals For You
    const bestDeals = {
      banner: `${baseUrl}/images/blinkit/best_deals_header_banner.png`,
      products: [
        { id: 'deal-amul-fresh-milk-1l', name: 'Amul Fresh Milk', displayName: 'Amul Fresh Milk', unit: '1 Ltr', price: 68, finalPrice: 62, discount: 9, image: `${baseUrl}/images/blinkit/deal_amul_milk.png` },
        { id: 'deal-tata-salt-1kg', name: 'Tata Salt', displayName: 'Tata Salt', unit: '1 kg', price: 22, finalPrice: 18, discount: 18, image: `${baseUrl}/images/blinkit/deal_tata_salt.png` },
        { id: 'deal-maggi-2min-noodles-70g', name: 'Maggi 2-Minute Noodles', displayName: 'Maggi 2-Minute Noodles', unit: '70 g', price: 15, finalPrice: 12, discount: 20, image: `${baseUrl}/images/blinkit/deal_maggi_noodles.png` },
        { id: 'deal-lays-classic-chips-52g', name: 'Lays Classic Chips', displayName: 'Lays Classic Chips', unit: '52 g', price: 25, finalPrice: 20, discount: 20, image: `${baseUrl}/images/blinkit/deal_lays_chips.png` },
        { id: 'deal-coca-cola-750ml', name: 'Coca-Cola', displayName: 'Coca-Cola', unit: '750 ml', price: 60, finalPrice: 45, discount: 25, image: `${baseUrl}/images/blinkit/deal_coca_cola.png` },
        { id: 'deal-nestle-kitkat-36g', name: 'Nestle KitKat', displayName: 'Nestle KitKat', unit: '36 g', price: 40, finalPrice: 30, discount: 25, image: `${baseUrl}/images/blinkit/deal_nestle_kitkat.png` },
      ]
    };

    // 6. Shop by Brands
    const brandsSection = {
      banner: `${baseUrl}/images/blinkit/shop_by_brands_header.png`,
      brands: [
        { id: 'amul', name: 'Amul', image: `${baseUrl}/images/blinkit/brand_card_amul.png`, link: '/products?search=Amul' },
        { id: 'mother-dairy', name: 'Mother Dairy', image: `${baseUrl}/images/blinkit/brand_card_mother_dairy.png`, link: '/products?search=Mother%20Dairy' },
        { id: 'nandini', name: 'Nandini', image: `${baseUrl}/images/blinkit/brand_card_nandini.png`, link: '/products?search=Nandini' },
        { id: 'tata', name: 'TATA', image: `${baseUrl}/images/blinkit/brand_card_tata.png`, link: '/products?search=Tata' },
        { id: 'maggi', name: 'Maggi', image: `${baseUrl}/images/blinkit/brand_card_maggi.png`, link: '/products?search=Maggi' },
        { id: 'lays', name: "Lay's", image: `${baseUrl}/images/blinkit/brand_card_lays.png`, link: '/products?search=Lay%27s' },
        { id: 'britannia', name: 'Britannia', image: `${baseUrl}/images/blinkit/brand_card_britannia.png`, link: '/products?search=Britannia' },
        { id: 'coca-cola', name: 'Coca-Cola', image: `${baseUrl}/images/blinkit/brand_card_coca_cola.png`, link: '/products?search=Coca-Cola' },
      ]
    };

    res.json({
      success: true,
      data: {
        heroBanner,
        promoCards,
        categoryBanner,
        categories: {
          row1: categoriesRow1,
          row2: categoriesRow2,
          row3: categoriesRow3,
        },
        milkSection,
        bestDeals,
        brandsSection,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
  getGroceryHomepage,
};
