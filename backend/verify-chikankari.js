require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect(process.env.MONGO_URI).then(() => {
  Product.find({category: 'Chikankari Suits'}).then(p => {
    console.log('\n📷 CHIKANKARI SUITS WITH UNIQUE CLOUDINARY URLS:\n');
    p.forEach((prod, idx) => {
      console.log(`[${idx+1}] ${prod.name}`);
      console.log(`    ₹${prod.finalPrice}`);
      console.log(`    ${prod.images[0]?.url.substring(0, 80)}...\n`);
    });
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
});
