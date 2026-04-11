const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const mensShirtsPantsRange = [
  {
    name: "Premium Cream Linen Shirt",
    description: "Elegant premium cream linen shirt by Priveeparis. Perfect for formal occasions and office wear.",
    category: "Linen Shirts & Pants",
    price: 2500,
    discount: 10,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725775/Linen_Shirts_Pants/Cream-Linen-Shirt-Priveeparis.webp"
    }]
  },
  {
    name: "Mousse Linen Oxford Shirt",
    description: "Classic mousse linen oxford shirt with slim fit. Premium quality for professional look.",
    category: "Linen Shirts & Pants",
    price: 3200,
    discount: 15,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725776/Linen_Shirts_Pants/Mousse-Linen-Oxford-Shirt.webp"
    }]
  },
  {
    name: "Men's Jamaica Formal Pants",
    description: "Stylish men's Jamaica formal pants. Comfortable and elegant for formal occasions.",
    category: "Linen Shirts & Pants",
    price: 2800,
    discount: 12,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775726365/Linen_Shirts_Pants/Mens-Jamaica-Pants.jpg"
    }]
  },
  {
    name: "Executive Linen Shirt Collection",
    description: "Premium executive linen shirt collection. Perfect blend of comfort and formal elegance.",
    category: "Linen Shirts & Pants",
    price: 3500,
    discount: 18,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725775/Linen_Shirts_Pants/Cream-Linen-Shirt-Priveeparis.webp"
    }]
  }
];

async function seedMensShirtsPantsRange() {
  const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing Linen products
    await Product.deleteMany({ category: 'Linen Shirts & Pants' });
    console.log('🗑️  Cleared existing Linen Shirts & Pants products\n');

    // Insert new products one by one (to trigger pre-save hook)
    const insertedProducts = [];
    for (const productData of mensShirtsPantsRange) {
      const product = new Product(productData);
      await product.save();
      insertedProducts.push(product);
    }

    console.log('📦 Added Men\'s Shirts & Formal Pants (₹2,000-₹3,800 range):\n');

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Original Price: ₹${product.price}`);
      console.log(`   🏷️  Discount: ${product.discount}%`);
      console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      console.log(`   ✓ Stock: ${product.stock}\n`);
    });

    console.log(`✅ Successfully seeded ${insertedProducts.length} Men's Shirts & Formal Pants!`);
    console.log('📊 All prices within ₹2,000-₹3,800 range as requested.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

seedMensShirtsPantsRange();
