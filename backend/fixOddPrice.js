const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function fixOddPrice() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Fix Printed Formal Shirt Set price to make final price even
    const product = await Product.findOne({ name: "Printed Formal Shirt Set" });
    if (product) {
      product.price = 1520; // 1520 - 15% = 1292 (even)
      await product.save();
      console.log('✅ Fixed: Printed Formal Shirt Set');
      console.log(`   Price: ₹${product.price} → Final: ₹${product.finalPrice}\n`);
    }

    console.log('📋 All Linen Shirts & Pants (All Even Final Prices):\n');
    const allProducts = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });

    allProducts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice} ✓`);
    });

    console.log(`\n📊 Total: ${allProducts.length} Linen Shirts & Pants products`);

    await mongoose.connection.close();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

fixOddPrice();
