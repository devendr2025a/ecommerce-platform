const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function checkCurrentState() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categories = await Product.distinct('category');
    
    console.log('📊 Current Product Counts by Category:\n');
    
    for (const category of categories) {
      const products = await Product.find({ category }).sort({ price: 1 });
      console.log(`\n${category}: ${products.length} products`);
      console.log('─'.repeat(50));
      
      products.slice(0, 3).forEach((p, i) => {
        console.log(`${i + 1}. ${p.name}`);
        console.log(`   Price: ₹${p.price} → ₹${p.finalPrice}`);
      });
      
      if (products.length > 3) {
        console.log(`... and ${products.length - 3} more`);
      }
    }

    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

checkCurrentState();
