const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const morePasshmineProducts = [
  {
    name: "Kashifa Beige Pashmina Wrap",
    description: "Beautiful beige pashmina wrap with traditional Kashmiri weave. Soft and luxurious.",
    category: "Pashmina Shawls",
    price: 1350,
    discount: 8,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722163/Pashmina_Shawls/Kashifa-Beige-Pashmina.webp"
    }]
  },
  {
    name: "Premium Pashmina Stole",
    description: "Elegant pashmina stole with fine embroidery. Perfect for weddings and celebrations.",
    category: "Pashmina Shawls",
    price: 2000,
    discount: 18,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722164/Pashmina_Shawls/Pashmina-Stole-1.webp"
    }]
  },
  {
    name: "Designer Pashmina Collection",
    description: "Exclusive designer pashmina shawl with intricate patterns. Limited collection.",
    category: "Pashmina Shawls",
    price: 2200,
    discount: 20,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722165/Pashmina_Shawls/Designer-Pashmina-1.jpg"
    }]
  },
  {
    name: "Premium Quality Pashmina Shawl",
    description: "High-quality pashmina shawl with superior softness. Luxury at its best.",
    category: "Pashmina Shawls",
    price: 1700,
    discount: 14,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722166/Pashmina_Shawls/Premium-Pashmina-1.jpg"
    }]
  },
  {
    name: "Kashmiri Traditional Pashmina",
    description: "Authentic Kashmiri pashmina with traditional weaving techniques. Timeless elegance.",
    category: "Pashmina Shawls",
    price: 1900,
    discount: 16,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722167/Pashmina_Shawls/Kashmiri-Pashmina-1.jpg"
    }]
  },
  {
    name: "Heritage Pashmina Wrap",
    description: "Heritage collection pashmina wrap with fine craftsmanship. A piece of tradition.",
    category: "Pashmina Shawls",
    price: 1850,
    discount: 12,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722168/Pashmina_Shawls/Heritage-Pashmina-1.jpg"
    }]
  },
  {
    name: "Elegant Pashmina Shawl",
    description: "Elegant pashmina shawl perfect for any occasion. Comfortable and stylish.",
    category: "Pashmina Shawls",
    price: 1550,
    discount: 10,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722169/Pashmina_Shawls/Elegant-Pashmina-1.jpg"
    }]
  },
  {
    name: "Ethnic Winter Pashmina",
    description: "Ethnic design pashmina for winter season. Warm and fashionable.",
    category: "Pashmina Shawls",
    price: 1450,
    discount: 11,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722170/Pashmina_Shawls/Ethnic-Winter-Pashmina.webp"
    }]
  },
  {
    name: "Traditional Pashmina Collection",
    description: "Traditional design pashmina with heritage patterns. Timeless classic.",
    category: "Pashmina Shawls",
    price: 1650,
    discount: 13,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722171/Pashmina_Shawls/Traditional-Pashmina.jpg"
    }]
  },
  {
    name: "Designer Pashmina Design",
    description: "Designer collection with exclusive pashmina design patterns. Unique and luxurious.",
    category: "Pashmina Shawls",
    price: 2100,
    discount: 19,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775722172/Pashmina_Shawls/Pashmina-Design-1.webp"
    }]
  }
];

async function seedMorePasshmine() {
  const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB\n');

    // Insert new products one by one (to trigger pre-save hook)
    const insertedProducts = [];
    for (const productData of morePasshmineProducts) {
      const product = new Product(productData);
      await product.save();
      insertedProducts.push(product);
    }
    
    console.log('📦 Added 10 More Pashmina Shawl Products:\n');

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 6}. ${product.name}`);
      console.log(`   💰 Price: ₹${product.price}`);
      if (product.discount > 0) {
        console.log(`   🏷️  Discount: ${product.discount}%`);
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      } else {
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      }
      console.log();
    });

    console.log(`✅ Successfully added ${insertedProducts.length} new Pashmina Shawl products!`);
    
    // Show total count
    const total = await Product.countDocuments({ category: 'Pashmina Shawls' });
    console.log(`\n📊 Total Pashmina Shawls in database: ${total}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

seedMorePasshmine();
