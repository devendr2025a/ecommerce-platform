const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function fixLinenPrices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Update product prices to ensure even final prices
    const updates = [
      { name: "Men's Slim Running Pants", newPrice: 700, newDiscount: 14 }, // 700 - 14% = 602 (even)
      { name: "Oversized Casual T-Shirt", newPrice: 560, newDiscount: 9 },  // 560 - 9% = 510 (even)
      { name: "Regular Solid T-Shirt", newPrice: 490, newDiscount: 11 }     // 490 - 11% = 436 (even)
    ];

    console.log('🔧 Fixing prices for even final amounts:\n');

    for (const update of updates) {
      const product = await Product.findOne({ name: update.name });
      if (product) {
        product.price = update.newPrice;
        product.discount = update.newDiscount;
        await product.save(); // Triggers pre-save hook
        console.log(`✅ Updated: ${product.name}`);
        console.log(`   Price: ₹${product.price} → Final: ₹${product.finalPrice}\n`);
      }
    }

    // Show all products with final prices
    console.log('📋 All Linen Shirts & Pants Products:\n');
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice}`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

fixLinenPrices();
