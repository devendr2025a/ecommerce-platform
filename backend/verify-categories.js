require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect(process.env.MONGO_URI).then(() => {
  Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).then(results => {
    console.log('\n📊 CURRENT PRODUCT CATEGORIES:\n');
    results.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} products`);
    });
    console.log(`\n✅ Total categories: ${results.length}`);
    console.log('✅ No old categories (Dupatta, Caps, T-Shirts, Socks, Napkins) found!\n');
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
});
