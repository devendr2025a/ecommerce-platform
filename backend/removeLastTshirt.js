const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function removeLastTshirt() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Remove the last T-shirt
    await Product.deleteOne({ name: "Premium Round Neck T-Shirt", category: 'Linen Shirts & Pants' });
    
    console.log('✅ Removed: Premium Round Neck T-Shirt\n');

    console.log('📋 Final Linen Shirts & Pants (Pure Shirts & Pants Only):\n');
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice}\n`);
    });

    console.log(`📊 Current: ${products.length} items`);
    console.log(`⚠️  Need to add ${Math.max(0, 10 - products.length)} more shirt/pant images`);

    await mongoose.connection.close();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

removeLastTshirt();
