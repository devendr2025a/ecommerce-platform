const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function removeSecondProduct() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Remove the 2nd product (Mousse Linen Oxford Shirt)
    const result = await Product.deleteOne({
      name: "Mousse Linen Oxford Shirt",
      category: 'Linen Shirts & Pants'
    });

    if (result.deletedCount > 0) {
      console.log('✅ Removed: Mousse Linen Oxford Shirt\n');
    }

    // Show remaining products
    console.log('📋 Remaining Linen Shirts & Pants Products:\n');
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ createdAt: 1 });

    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   📸 Image: ${p.images[0]?.url ? '✅ Has image' : '❌ No image'}`);
      console.log(`   💰 Price: ₹${p.price} → ₹${p.finalPrice}\n`);
    });

    console.log(`📊 Total: ${products.length} products remaining`);

    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

removeSecondProduct();
