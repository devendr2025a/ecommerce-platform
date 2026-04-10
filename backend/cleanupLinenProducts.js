const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

async function removeNonShirtsPants() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Remove items that aren't shirts or pants
    const itemsToRemove = [
      "Mati Roots Beige Short Kurta",      // KURTA - not shirt/pant
      "Men's Jamaica Shorts",              // SHORTS - not pants
      "Printed Shirt & Pyjamas Set"        // PYJAMAS - not shirt/pant
    ];

    console.log('🗑️  Removing non-shirt/pant items:\n');

    for (const name of itemsToRemove) {
      const result = await Product.deleteOne({ name, category: 'Linen Shirts & Pants' });
      if (result.deletedCount > 0) {
        console.log(`✅ Removed: ${name}`);
      }
    }

    console.log('\n📋 Remaining Linen Shirts & Pants (10 items):\n');
    const products = await Product.find({ category: 'Linen Shirts & Pants' }).sort({ price: 1 });
    
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   ₹${p.price} (-${p.discount}%) → ₹${p.finalPrice}\n`);
    });

    console.log(`📊 Total: ${products.length} Linen Shirts & Pants`);

    await mongoose.connection.close();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

removeNonShirtsPants();
