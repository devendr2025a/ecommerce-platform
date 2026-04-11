/**
 * Seed premium collection - 30 products (5 per category)
 * Only specific categories with image
 * Usage: node src/scripts/seedProductsNew.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Load Cloudinary URLs
const uploadedImages = require('../config/uploadedImages.json');

const PRODUCTS = [
  // ─── 100% Cotton Kurtas (5) | ₹1,800 – ₹2,800 ───
  { 
    name: "Premium White Cotton Kurta", 
    category: "100% Cotton Kurtas", 
    price: 1800, 
    discount: 10,
    description: "Breathable 100% cotton kurta, perfect for daily & festive wear. Soft and comfortable.",
    stock: 50 
  },
  { 
    name: "Maroon Pure Cotton Kurta", 
    category: "100% Cotton Kurtas", 
    price: 2100, 
    discount: 14,
    description: "Natural cotton kurta with elegant design for home and casual occasions.",
    stock: 45 
  },
  { 
    name: "Navy Blue Cotton Kurta", 
    category: "100% Cotton Kurtas", 
    price: 2400, 
    discount: 20,
    description: "Classic navy cotton kurta, versatile for everyday wear.",
    stock: 55 
  },
  { 
    name: "Beige Plain Cotton Kurta", 
    category: "100% Cotton Kurtas", 
    price: 2600, 
    discount: 12,
    description: "Soft beige cotton kurta with minimalist design, ideal for both men and women.",
    stock: 40 
  },
  { 
    name: "Green Printed Cotton Kurta", 
    category: "100% Cotton Kurtas", 
    price: 2800, 
    discount: 18,
    description: "Beautiful printed cotton kurta in fresh green shades, perfect for summer.",
    stock: 60 
  },

  // ─── Chikankari Suits (5) | ₹2,500 – ₹4,500 ───
  { 
    name: "White Chikankari Suit Set", 
    category: "Chikankari Suits", 
    price: 2500, 
    discount: 20,
    description: "Hand-embroidered chikankari suit set with elegance and traditional craftsmanship.",
    stock: 30 
  },
  { 
    name: "Cream Chikankari Kurta Palazzo", 
    category: "Chikankari Suits", 
    price: 3200, 
    discount: 15,
    description: "Delicate hand-embroidered cream chikankari set with matching palazzo pants.",
    stock: 28 
  },
  { 
    name: "Beige Chikankari Designer Suit", 
    category: "Chikankari Suits", 
    price: 3800, 
    discount: 25,
    description: "Premium chikankari embroidered suit with intricate needle work details.",
    stock: 25 
  },
  { 
    name: "Peach Chikankari Formal Suit", 
    category: "Chikankari Suits", 
    price: 4100, 
    discount: 12,
    description: "Elegant peach chikankari suit for festive occasions and celebrations.",
    stock: 20 
  },
  { 
    name: "Ivory Chikankari Premium Set", 
    category: "Chikankari Suits", 
    price: 4500, 
    discount: 10,
    description: "Luxurious ivory chikankari suit set with finest embroidery work.",
    stock: 35 
  },

  // ─── Silk Sarees (5) | ₹3,500 – ₹5,500 ───
  { 
    name: "Gold Silk Saree", 
    category: "Silk Sarees", 
    price: 3500, 
    discount: 14,
    description: "Premium gold silk saree, perfect for festive & occasion wear.",
    stock: 20 
  },
  { 
    name: "Maroon Silk Saree with Border", 
    category: "Silk Sarees", 
    price: 4000, 
    discount: 20,
    description: "Rich maroon silk saree with traditional zari border for weddings.",
    stock: 18 
  },
  { 
    name: "Deep Red Banarasi Silk Saree", 
    category: "Silk Sarees", 
    price: 4500, 
    discount: 18,
    description: "Authentic Banarasi silk saree in deep red, ideal for special occasions.",
    stock: 22 
  },
  { 
    name: "Emerald Green Silk Saree", 
    category: "Silk Sarees", 
    price: 5000, 
    discount: 12,
    description: "Elegant emerald green silk saree with intricate weave patterns.",
    stock: 16 
  },
  { 
    name: "Royal Blue Silk Saree Premium", 
    category: "Silk Sarees", 
    price: 5500, 
    discount: 10,
    description: "Premium quality royal blue silk saree for premium occasions.",
    stock: 25 
  },

  // ─── Linen Shirts & Pants (5) | ₹2,000 – ₹3,800 ───
  { 
    name: "White Linen Casual Shirt", 
    category: "Linen Shirts & Pants", 
    price: 2000, 
    discount: 15,
    description: "Breathable pure linen shirt, perfect for smart ethnic-fusion look.",
    stock: 40 
  },
  { 
    name: "Cream Linen Formal Shirt", 
    category: "Linen Shirts & Pants", 
    price: 2400, 
    discount: 20,
    description: "Premium cream linen formal shirt suitable for office and social events.",
    stock: 35 
  },
  { 
    name: "Beige Linen Pants", 
    category: "Linen Shirts & Pants", 
    price: 2800, 
    discount: 18,
    description: "Comfortable beige linen pants for casual and formal occasions.",
    stock: 32 
  },
  { 
    name: "Stone Color Linen Shirt Combo", 
    category: "Linen Shirts & Pants", 
    price: 3200, 
    discount: 12,
    description: "Coordinated linen shirt and trousers set in sophisticated stone color.",
    stock: 28 
  },
  { 
    name: "Navy Linen Full Outfit Set", 
    category: "Linen Shirts & Pants", 
    price: 3800, 
    discount: 10,
    description: "Complete navy linen outfit set - shirt with matching formal pants.",
    stock: 30 
  },

  // ─── Pashmina Stoles (5) | ₹2,800 – ₹5,000 ───
  { 
    name: "Cream Pashmina Stole", 
    category: "Pashmina Stoles", 
    price: 2800, 
    discount: 15,
    description: "Soft luxurious cream pashmina stole, perfect for winter elegance.",
    stock: 50 
  },
  { 
    name: "Classic White Pashmina Shawl", 
    category: "Pashmina Stoles", 
    price: 3400, 
    discount: 20,
    description: "Pure white pashmina stole for occasion and formal wear.",
    stock: 45 
  },
  { 
    name: "Charcoal Grey Pashmina", 
    category: "Pashmina Stoles", 
    price: 3900, 
    discount: 12,
    description: "Sophisticated charcoal grey pashmina stole with subtle weave.",
    stock: 40 
  },
  { 
    name: "Beige Border Pashmina Stole", 
    category: "Pashmina Stoles", 
    price: 4400, 
    discount: 18,
    description: "Premium pashmina stole with beautiful beige border detailing.",
    stock: 35 
  },
  { 
    name: "Royal Luxury Pashmina Shawl", 
    category: "Pashmina Stoles", 
    price: 5000, 
    discount: 10,
    description: "Finest quality royal pashmina shawl, ultimate luxury winter wear.",
    stock: 25 
  },

  // ─── Accessories (5) | ₹100 – ₹500 ───
  { 
    name: "Cotton Cap - Casual Style", 
    category: "Accessories", 
    price: 150, 
    discount: 20,
    description: "Comfortable cotton cap for casual outdoor wear.",
    stock: 200 
  },
  { 
    name: "Printed Dupatta", 
    category: "Accessories", 
    price: 250, 
    discount: 16,
    description: "Beautiful printed dupatta, versatile ethnic accessory.",
    stock: 180 
  },
  { 
    name: "Cotton Socks Pack (3 pairs)", 
    category: "Accessories", 
    price: 300, 
    discount: 24,
    description: "Soft cotton socks combo pack for everyday comfort.",
    stock: 250 
  },
  { 
    name: "Premium Napkins 12-Pack", 
    category: "Accessories", 
    price: 400, 
    discount: 10,
    description: "High-quality pure cotton napkins for kitchen and dining.",
    stock: 300 
  },
  { 
    name: "Multi-color Napkins Set", 
    category: "Accessories", 
    price: 500, 
    discount: 20,
    description: "Colorful cotton napkins set, beautiful and practical.",
    stock: 220 
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    await Product.deleteMany({});
    console.log('🗑  Cleared existing products\n');

    const created = [];

    for (let i = 0; i < PRODUCTS.length; i++) {
      const p = PRODUCTS[i];
      
      let imageUrl = uploadedImages['product.webp'].url; // Default image
      
      // Select Cloudinary image based on category
      if (p.category === "100% Cotton Kurtas") {
        const kurtaIndex = (i % 5) + 1; // Rotate between kurta-1 to kurta-5
        const kurataFile = `kurta-${kurtaIndex}.webp`;
        imageUrl = uploadedImages[kurataFile]?.url || imageUrl;
      } else if (p.category === "Silk Sarees") {
        const sareeIndex = ((i - 10) % 5) + 1; // Rotate between saree-1 to saree-5
        const sareeFile = `saree-${sareeIndex}.webp`;
        imageUrl = uploadedImages[sareeFile]?.url || imageUrl;
      }
      
      const images = [
        { url: imageUrl, public_id: `product-${i}` },
        { url: imageUrl, public_id: `product-${i}` },
      ];

      const rating = parseFloat((4.0 + Math.random() * 0.9).toFixed(1));
      const numReviews = Math.floor(50 + Math.random() * 300);
      
      // Calculate finalPrice with rounding
      const finalPrice = Math.round(p.price - (p.price * p.discount / 100));

      const product = await Product.create({
        name: p.name,
        category: p.category,
        description: p.description,
        price: p.price,
        discount: p.discount,
        finalPrice,
        stock: p.stock,
        images,
        rating,
        numReviews,
        isActive: true,
      });

      created.push(product);
      process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ✓ ${product.name} (₹${finalPrice})\n`);
    }

    console.log('\n' + '━'.repeat(60));
    console.log(`\n🎉 Successfully seeded ${created.length} products!\n`);

    const categories = [...new Set(created.map((p) => p.category))];
    categories.forEach((cat) => {
      const count = created.filter((p) => p.category === cat).length;
      console.log(`  ${cat}: ${count} products`);
    });

    console.log('\n🛍  Open http://localhost:5173/products to browse them\n');
  } catch (err) {
    console.error('\n❌ Seeder error:', err.message);
    console.error(err.stack);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedProducts();
