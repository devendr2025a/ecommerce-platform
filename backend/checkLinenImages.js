const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkLinenProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ createdAt: 1 });

    console.log('📋 Current Linen Shirts & Pants Products:\n');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   📸 Image: ${p.images[0]?.url ? '✅ Has image' : '❌ No image'}`);
      console.log(`   💰 Price: ₹${p.price} → ₹${p.finalPrice}\n`);
    });

    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

checkLinenProducts();
