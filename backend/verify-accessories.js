require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect(process.env.MONGO_URI).then(() => {
  Product.find({category: 'Accessories'}).then(p => {
    console.log('\n📷 ACCESSORIES PRODUCTS:\n');
    p.forEach((prod, idx) => {
      console.log(`[${idx+1}] ${prod.name}`);
      console.log(`    Category: ${prod.category}`);
      console.log(`    SubCategory: ${prod.subCategory}`);
      console.log(`    Price: ₹${prod.price} → Final: ₹${prod.finalPrice}`);
      console.log(`    Image field:`, prod.image);
      console.log(`    Images array:`, prod.images);
      console.log('');
    });
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
});
