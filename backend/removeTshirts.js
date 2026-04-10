const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function removeAllTshirts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Remove all T-shirts, keep only actual Shirts and Pants
    const tshirtsToRemove = [
      "Men's Round Neck T-Shirt",
      "Regular Solid T-Shirt",
      "Classic Round Neck T-Shirt",
      "Cotton Crew Neck T-Shirt",
      "Oversized Casual T-Shirt"
    ];

    console.log('🗑️  Removing T-shirts (keeping only Shirts & Pants):\n');

    for (const name of tshirtsToRemove) {
      const result = await Product.deleteOne({ name, category: 'Linen Shirts & Pants' });
      if (result.deletedCount > 0) {
        console.log(`✅ Removed: ${name}`);
      }
    }

    console.log('\n📋 Remaining Linen Shirts & Pants (ONLY Shirts & Pants):\n');
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice}\n`);
    });

    console.log(`📊 Total: ${products.length} Linen Shirts & Pants`);

    await mongoose.connection.close();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

removeAllTshirts();
