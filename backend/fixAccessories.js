require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

async function fixAccessories() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('✅ Connected to MongoDB');

    // Count before
    const countBefore = await Product.countDocuments({ category: 'Accessories' });
    console.log(`📊 Before: ${countBefore} accessories products`);

    // Delete ALL accessories completely
    const deleteResult = await Product.deleteMany({ category: 'Accessories' });
   console.log(`🗑️  Deleted ${deleteResult.deletedCount} documents`);

    // Verify deletion
    const countAfter = await Product.countDocuments({ category: 'Accessories' });
    console.log(`✅ After deletion: ${countAfter} accessories products`);

    // Now reseed
    const accessories = [
      {
        name: "Classic Summer Cap - Black",
        description: "Breathable fabric summer cap perfect for outdoor activities.",
        price: 350,
        discount: 15,
        category: "Accessories",
        sizes: [],
        colors: ["Black", "Blue", "White"],
        stock: 50,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718506/Accessories/Cap/cap.jpg",
          public_id: "Accessories/Cap/classic-1"
        }]
      },
      {
        name: "Winter Wool Cap - Navy",
        description: "Premium wool winter cap with warm lining.",
        price: 450,
        discount: 20,
        category: "Accessories",
        sizes: [],
        colors: ["Navy", "Grey", "Black"],
        stock: 45,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718504/Accessories/Cap/cap%20winter.jpg",
          public_id: "Accessories/Cap/winter-1"
        }]
      },
      {
        name: "Bandhani Cotton Dupatta - Red",
        description: "Traditional bandhani print dupatta for festive occasions.",
        price: 600,
        discount: 16,
        category: "Accessories",
        sizes: [],
        colors: ["Red", "Purple", "Blue"],
        stock: 40,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718507/Accessories/Dupatta/bandhani%20duppata.jpg",
          public_id: "Accessories/Dupatta/bandhani-1"
        }]
      },
      {
        name: "Mirror Work Dupatta - Gold",
        description: "Elegant dupatta with mirror work embellishment.",
        price: 700,
        discount: 22,
        category: "Accessories",
        sizes: [],
        colors: ["Gold", "Pink", "Green"],
        stock: 35,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718511/Accessories/Dupatta/mirror%20work%20Dupatta.webp",
          public_id: "Accessories/Dupatta/mirror-1"
        }]
      },
      {
        name: "Cotton Multicolor Socks - Pack of 3",
        description: "Comfortable cotton socks with multicolor patterns.",
        price: 200,
        discount: 15,
        category: "Accessories",
        sizes: [],
        colors: ["Multicolor"],
        stock: 100,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718520/Accessories/Socks/cotton%20shocks.jpg",
          public_id: "Accessories/Socks/cotton-multicolor-1"
        }]
      },
      {
        name: "Men's Formal Dress Socks - Black",
        description: "Premium quality formal dress socks for office wear.",
        price: 250,
        discount: 18,
        category: "Accessories",
        sizes: [],
        colors: ["Black", "Navy", "Brown"],
        stock: 80,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718525/Accessories/Socks/mens%20comfortable%20shocks.jpg",
          public_id: "Accessories/Socks/formal-1"
        }]
      },
      {
        name: "Cotton Face Napkins - Pack of 12",
        description: "Soft cotton napkins perfect for facial care.",
        price: 120,
        discount: 16,
        category: "Accessories",
        sizes: [],
        colors: ["White"],
        stock: 150,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718527/Accessories/Napkin/cotton%20face%20napkin.webp",
          public_id: "Accessories/Napkin/face-1"
        }]
      },
      {
        name: "Cotton Kitchen Napkins - 6 Pack",
        description: "Durable cotton kitchen napkins for everyday use.",
        price: 100,
        discount: 12,
        category: "Accessories",
        sizes: [],
        colors: ["White", "Beige"],
        stock: 120,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718528/Accessories/Napkin/cotton%20kichen%20napkin.jpg",
          public_id: "Accessories/Napkin/kitchen-1"
        }]
      },
      {
        name: "Premium Dining Napkins - White",
        description: "Premium quality dining napkins for formal occasions.",
        price: 180,
        discount: 20,
        category: "Accessories",
        sizes: [],
        colors: ["Cream", "White"],
        stock: 80,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718531/Accessories/Napkin/kitchen%20napkin.webp",
          public_id: "Accessories/Napkin/dining-1"
        }]
      },
      {
        name: "Multicolor Baby Napkins - Safe Fabric",
        description: "Soft and safe multicolor napkins for babies.",
        price: 150,
        discount: 14,
        category: "Accessories",
        sizes: [],
        colors: ["Multicolor"],
        stock: 100,
        images: [{
          url: "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718524/Accessories/Napkin/baby%20napkin%20multicolor.webp",
          public_id: "Accessories/Napkin/baby-1"
        }]
      }
    ];

    const inserted = await Product.insertMany(accessories);
    console.log(`✅ Inserted ${inserted.length} fresh accessories products\n`);

    // Now explicitly calculate and update finalPrice for all
    for (let p of inserted) {
      if (p.discount && p.discount > 0) {
        p.finalPrice = Math.round(p.price - (p.price * p.discount / 100));
      } else {
        p.finalPrice = Math.round(p.price);
      }
      await p.save();
    }

    // Re-fetch to verify
    const verified = await Product.find({ category: 'Accessories' });
    console.log(`✅ Verified ${verified.length} accessories products\n`);

    verified.forEach((p, i) => {
      console.log(`[${i+1}] ${p.name}`);
      console.log(`    Price: ₹${p.price} → Final: ₹${p.finalPrice}`);
      console.log(`    Image: ${p.images[0].url.substring(0, 70)}...`);
      console.log();
    });

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixAccessories();
