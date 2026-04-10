const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkPashmine() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({ category: 'Pashmina Shawls' });
    console.log('\n📦 Pashmina Shawls in Database:\n');
    products.forEach((p, i) => {
      console.log(`${i+1}. ${p.name}`);
      console.log(`   📸 Image: ${p.images[0]?.url || 'No image'}`);
      console.log(`   💰 Price: ₹${p.price} → ₹${p.finalPrice}\n`);
    });
    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}
checkPashmine();
