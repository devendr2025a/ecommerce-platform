const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const linenProducts = [
  {
    name: "Premium Cream Linen Shirt",
    description: "Elegant cream linen shirt by Priveeparis. Perfect for formal and casual occasions.",
    category: "Linen Shirts & Pants",
    price: 1200,
    discount: 12,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725775/Linen_Shirts_Pants/Cream-Linen-Shirt-Priveeparis.webp"
    }]
  },
  {
    name: "Mousse Linen Oxford Shirt",
    description: "Slim fit linen oxford shirt with premium quality. Comfortable and stylish.",
    category: "Linen Shirts & Pants",
    price: 1400,
    discount: 15,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725776/Linen_Shirts_Pants/Mousse-Linen-Oxford-Shirt.webp"
    }]
  },
  {
    name: "Mati Roots Beige Short Kurta",
    description: "Comfortable beige short kurta. Great for Indian and ethnic occasions.",
    category: "Linen Shirts & Pants",
    price: 800,
    discount: 10,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725777/Linen_Shirts_Pants/Mati-Roots-Beige-Kurta.webp"
    }]
  },
  {
    name: "Men's Slim Running Pants",
    description: "Lightweight slim fit running pants. Breathable and flexible for active wear.",
    category: "Linen Shirts & Pants",
    price: 650,
    discount: 14,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725778/Linen_Shirts_Pants/Mens-Slim-Running-Pants.avif"
    }]
  },
  {
    name: "Men's Round Neck T-Shirt",
    description: "Classic round neck t-shirt. Perfect for everyday casual wear.",
    category: "Linen Shirts & Pants",
    price: 450,
    discount: 8,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725779/Linen_Shirts_Pants/Mens-Round-Neck-TShirt.webp"
    }]
  },
  {
    name: "Classic Round Neck T-Shirt",
    description: "Timeless classic round neck t-shirt. Comfortable for all seasons.",
    category: "Linen Shirts & Pants",
    price: 500,
    discount: 10,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725780/Linen_Shirts_Pants/Round-Neck-TShirt-Classic.webp"
    }]
  },
  {
    name: "Premium Round Neck T-Shirt",
    description: "Premium quality round neck t-shirt with superior softness.",
    category: "Linen Shirts & Pants",
    price: 600,
    discount: 12,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725782/Linen_Shirts_Pants/Round-Neck-TShirt-Premium.avif"
    }]
  },
  {
    name: "Oversized Casual T-Shirt",
    description: "Comfortable oversized t-shirt for casual lounging. Trendy and comfy.",
    category: "Linen Shirts & Pants",
    price: 550,
    discount: 9,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725783/Linen_Shirts_Pants/Oversize-TShirt-Casual.webp"
    }]
  },
  {
    name: "Regular Solid T-Shirt",
    description: "Simple and elegant regular t-shirt. Versatile for any occasion.",
    category: "Linen Shirts & Pants",
    price: 480,
    discount: 11,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725784/Linen_Shirts_Pants/Regular-TShirt.webp"
    }]
  },
  {
    name: "Cotton Crew Neck T-Shirt",
    description: "100% cotton crew neck t-shirt. Breathable and durable.",
    category: "Linen Shirts & Pants",
    price: 520,
    discount: 13,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725785/Linen_Shirts_Pants/Cotton-Crew-Neck-TShirt.webp"
    }]
  },
  {
    name: "Men's Jamaica Shorts",
    description: "Casual and lightweight Jamaica shorts. Perfect for summer.",
    category: "Linen Shirts & Pants",
    price: 700,
    discount: 16,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725787/Linen_Shirts_Pants/Mens-Jamaica-Shorts.jpg"
    }]
  },
  {
    name: "Printed Shirt & Pyjamas Set",
    description: "Complete printed shirt and pyjamas set. Comfortable sleepwear.",
    category: "Linen Shirts & Pants",
    price: 900,
    discount: 18,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725788/Linen_Shirts_Pants/Printed-Shirt-Pyjamas-Set.webp"
    }]
  },
  {
    name: "Formal Linen Shirt Collection",
    description: "Premium formal linen shirt for professional occasions. Executive style.",
    category: "Linen Shirts & Pants",
    price: 1300,
    discount: 14,
    stock: 10,
    images: [{
      url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775725789/Linen_Shirts_Pants/Linen-Shirt-Formal.webp"
    }]
  }
];

async function seedLinenProducts() {
  const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing Linen products
    await Product.deleteMany({ category: 'Linen Shirts & Pants' });
    console.log('🗑️  Cleared existing Linen Shirts & Pants products\n');

    // Insert new products one by one (to trigger pre-save hook)
    const insertedProducts = [];
    for (const productData of linenProducts) {
      const product = new Product(productData);
      await product.save();
      insertedProducts.push(product);
    }

    console.log('📦 Seeded Linen Shirts & Pants Products:\n');

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: ₹${product.price}`);
      if (product.discount > 0) {
        console.log(`   🏷️  Discount: ${product.discount}%`);
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      } else {
        console.log(`   ✨ Final Price: ₹${product.finalPrice}`);
      }
      console.log(`   ✓ Stock: ${product.stock}\n`);
    });

    console.log(`✅ Successfully seeded ${insertedProducts.length} Linen Shirts & Pants products!`);
    
    // Show total count
    const total = await Product.countDocuments({ category: 'Linen Shirts & Pants' });
    console.log(`\n📊 Total Linen Shirts & Pants in database: ${total}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

seedLinenProducts();
