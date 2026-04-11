const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categories = await Product.distinct('category');
    console.log('📋 All Categories in Database:\n');
    categories.forEach((cat, i) => {
      console.log(`${i + 1}. ${cat}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('📊 Products by Category:\n');

    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category}: ${count} products`);
    }

    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

checkCategories();
