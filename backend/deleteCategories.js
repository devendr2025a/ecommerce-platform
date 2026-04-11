const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function deleteCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Delete Pashmina Stoles category
    const result = await Product.deleteMany({ category: 'Pashmina Stoles' });
    console.log(`🗑️  Deleted Pashmina Stoles: ${result.deletedCount} products\n`);

    // Check remaining categories
    const categories = await Product.distinct('category');
    console.log('📋 Remaining Categories:\n');
    categories.forEach((cat, i) => {
      console.log(`${i + 1}. ${cat}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('📊 Products by Remaining Category:\n');

    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category}: ${count} products`);
    }

    await mongoose.connection.close();
    console.log('\n✅ Successfully deleted Pashmina Stoles category from backend!');
  } catch(e) {
    console.error('Error:', e.message);
  }
}

deleteCategories();
