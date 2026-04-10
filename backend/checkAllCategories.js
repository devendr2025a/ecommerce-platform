const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Get all categories
    const categories = await Product.distinct('category');
    console.log('📋 All Categories in Database:\n');
    categories.forEach((cat, i) => {
      console.log(`${i + 1}. ${cat}`);
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 Product Count by Category:\n');
    
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category}: ${count} products`);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🔍 Pashmina Shawls Details:\n');
    
    const pashmina = await Product.find({ category: 'Pashmina Shawls' }).limit(5);
    pashmina.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   Price: ₹${p.price} → ₹${p.finalPrice}`);
      console.log(`   Stock: ${p.stock}`);
      console.log();
    });
    
    await mongoose.connection.close();
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkCategories();
