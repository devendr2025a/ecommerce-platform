const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const pashmineProducts = [
  {
    name: "Royal Navy Pashmina Shawl",
    description: "Luxurious handwoven pashmina shawl with intricate aari jaal embroidery. Premium quality Kashmiri craftsmanship.",
    category: "Pashmina Shawls",
    price: 1400,
    discount: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775721570/Pashmina_Shawls/navy-blue-color-kashmiri-shawl-aari-jaal-trendy-wearer-work-524.jpg"
    }]
  },
  {
    name: "Elegant Beige Pashmina Wrap",
    description: "Beautiful beige pashmina shawl with delicate four-sided running border. Perfect for marriage season.",
    category: "Pashmina Shawls",
    price: 1600,
    discount: 12,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775721571/Pashmina_Shawls/stylish-beige-colour-kashmiri-sozni-shawl-embellished-designer-four-sided-running-border-853.jpg.webp"
    }]
  },
  {
    name: "Premium Women's Pashmina Shawl",
    description: "Soft faux pashmina shawl for women with ethnic weave design. Versatile and comfortable.",
    category: "Pashmina Shawls",
    price: 1500,
    discount: 8,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775721569/Pashmina_Shawls/pashtush-pashmina-pashtush-women-faux-pashmina-shawl-ethnic-weave-design-beige-30746404225078.jpg"
    }]
  },
  {
    name: "Men's Woven Ethnic Stole",
    description: "Extra soft bamboo fibre pashmina stole for men. Perfect for formal and casual occasions.",
    category: "Pashmina Shawls",
    price: 1800,
    discount: 15,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775721567/Pashmina_Shawls/pashtush-pashmina-pashtush-mens-woven-ethnic-stole-extra-soft-bamboo-fibre-29238723379254.jpg.webp"
    }]
  },
  {
    name: "Classic Navy Blue Pashmina",
    description: "Timeless navy blue pashmina wrap with traditional Kashmiri weave. A timeless classic.",
    category: "Pashmina Shawls",
    price: 1200,
    discount: 0,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775721566/Pashmina_Shawls/B-Vipul-Shanvi-Pashamina-NavyBlue_1_1024x1024.jpg.webp"
    }]
  }
];

async function seedPashmine() {
  const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing Pashmina products
    await Product.deleteMany({ category: 'Pashmina Shawls' });
    console.log('🗑️  Cleared existing Pashmina Shawls products\n');

    // Insert new products
    const insertedProducts = [];
    for (const productData of pashmineProducts) {
      const product = new Product(productData);
      await product.save();
      insertedProducts.push(product);
    }
    console.log('📦 Seeded Pashmina Shawl Products:\n');

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: ₹${product.price}`);
      if (product.discount > 0) {
        console.log(`   🏷️  Discount: ${product.discount}%`);
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      } else {
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      }
      console.log(`   📸 Image: ${product.images[0].url}\n`);
    });

    console.log(`✅ Successfully seeded ${insertedProducts.length} Pashmina Shawl products!`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

seedPashmine();
