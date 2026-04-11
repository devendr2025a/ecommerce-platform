const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkCurrent() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });
    console.log('📋 Current Linen Shirts & Pants:');
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ₹${p.finalPrice}`);
    });
    console.log(`\nTotal: ${products.length} items`);
    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

checkCurrent();
