const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function addStock() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Add stock to all Pashmina Shawls
    const result = await Product.updateMany(
      { category: 'Pashmina Shawls' },
      { stock: 10 }
    );
    
    console.log('✅ Updated Pashmina Shawls:');
    console.log(`   Modified: ${result.modifiedCount} products`);
    
    // Verify
    const products = await Product.find({ category: 'Pashmina Shawls' });
    console.log('\n📦 Pashmina Shawls Now:\n');
    products.forEach((p, i) => {
      console.log(`${i+1}. ${p.name}`);
      console.log(`   ✓ Stock: ${p.stock}`);
      console.log(`   💰 Price: ₹${p.price} → ₹${p.finalPrice}\n`);
    });
    
    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

addStock();
