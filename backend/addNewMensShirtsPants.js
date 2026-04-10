const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const newMensShirtsPants = [
  {
    name: "Printed Formal Shirt Set",
    description: "Elegant printed formal shirt with matching pyjamas. Perfect for formal occasions and office wear.",
    category: "Linen Shirts & Pants",
    price: 1500,
    discount: 15,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725788/Linen_Shirts_Pants/Printed-Shirt-Pyjamas-Set.webp"
    }]
  },
  {
    name: "Men's Jamaica Formal Pants",
    description: "Comfortable and stylish Jamaica formal pants. Great for casual and semi-formal occasions.",
    category: "Linen Shirts & Pants",
    price: 800,
    discount: 12,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775726365/Linen_Shirts_Pants/Mens-Jamaica-Pants.jpg"
    }]
  }
];

async function addNewMensShirtsPants() {
  const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB\n');

    // Insert new products one by one (to trigger pre-save hook)
    const insertedProducts = [];
    for (const productData of newMensShirtsPants) {
      const product = new Product(productData);
      await product.save();
      insertedProducts.push(product);
    }

    console.log('📦 Added New Men\'s Shirts & Pants Products:\n');

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: ₹${product.price}`);
      if (product.discount > 0) {
        console.log(`   🏷️  Discount: ${product.discount}%`);
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      } else {
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      }
      console.log(`   ✓ Stock: ${product.stock}\n`);
    });

    console.log('📋 Complete Linen Shirts & Pants Category:\n');
    const allProducts = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });

    allProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice}`);
    });

    console.log(`\n📊 Total: ${allProducts.length} Linen Shirts & Pants products`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

addNewMensShirtsPants();
