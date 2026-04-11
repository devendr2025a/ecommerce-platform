require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect(process.env.MONGO_URI).then(() => {
  Product.find({category: 'Silk Sarees'}).then(p => {
    console.log('\n📷 SILK SAREES WITH CLOUDINARY URLS:\n');
    p.forEach((prod, idx) => {
      console.log(`[${idx+1}] ${prod.name}`);
      console.log(`    ${prod.images[0]?.url}\n`);
    });
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
});
