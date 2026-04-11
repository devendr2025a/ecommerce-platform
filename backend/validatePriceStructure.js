const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

// Define new price structures - all prices end in '0'
const newPriceStructures = {
  '100% Cotton Kurtas': {
    range: '₹1,800 – ₹2,800',
    products: [
      { name: 'Premium Cotton Kurta - White', price: 1800, discount: 0 }, // 1800
      { name: 'Classic Cotton Kurta - Beige', price: 2000, discount: 0 }, // 2000
      { name: 'Daily Wear Cotton Kurta - Navy', price: 2200, discount: 5 }, // 2090
      { name: 'Festive Cotton Kurta - Maroon', price: 2400, discount: 10 }, // 2160
      { name: 'Summer Cotton Kurta - Cream', price: 2500, discount: 8 }, // 2300
      { name: 'Casual Cotton Kurta - Peach', price: 2700, discount: 10 }, // 2430
      { name: 'Premium White Cotton - Pure', price: 1900, discount: 5 }, // 1805
      { name: 'Cotton Kurta - Light Blue', price: 2100, discount: 5 }, // 1995
      { name: 'Festival Cotton Kurta - Gold', price: 2600, discount: 12 }, // 2288
      { name: 'Elegant Cotton Kurta - Rust', price: 2300, discount: 8 } // 2116
    ]
  },
  'Chikankari Suits': {
    range: '₹2,500 – ₹4,500',
    products: [
      { name: 'Chikankari Suit - White', price: 2500, discount: 0 }, // 2500
      { name: 'Chikankari Kurta - Cream', price: 2800, discount: 5 }, // 2660
      { name: 'Hand Embroidered Suite - Peach', price: 3200, discount: 10 }, // 2880
      { name: 'Designer Chikankari - Beige', price: 3500, discount: 8 }, // 3220
      { name: 'Premium Chikankari Set - Pink', price: 3800, discount: 12 }, // 3344
      { name: 'Elegant Chikankari - Ivory', price: 4000, discount: 15 }, // 3400
      { name: 'Festival Chikankari - Baby Pink', price: 4200, discount: 10 }, // 3780
      { name: 'Luxury Chikankari Suite - Powder Blue', price: 4500, discount: 20 }, // 3600
      { name: 'Chikankari Suit - Mint Green', price: 3000, discount: 6 }, // 2820
      { name: 'Embroidered Kurta Set - Ash Grey', price: 3300, discount: 9 } // 3003
    ]
  },
  'Silk Sarees': {
    range: '₹3,500 – ₹5,500',
    products: [
      { name: 'Classic Silk Saree - Red', price: 3500, discount: 0 }, // 3500
      { name: 'Banarasi Silk Saree - Gold', price: 4000, discount: 5 }, // 3800
      { name: 'Festive Silk Saree - Maroon', price: 4500, discount: 10 }, // 4050
      { name: 'Premium Silk Saree - Blue', price: 5000, discount: 12 }, // 4400
      { name: 'Luxury Silk Saree - Purple', price: 5500, discount: 15 }, // 4675 (odd - need to fix)
      { name: 'Wedding Silk Saree - Green', price: 5200, discount: 14 }, // 4472 (odd - need to fix)
      { name: 'Silk Saree - Cream', price: 3800, discount: 8 }, // 3496 (odd - need to fix)
      { name: 'Designer Silk Saree - Black', price: 4200, discount: 5 }, // 3990
      { name: 'Party Silk Saree - Pink', price: 4700, discount: 8 }, // 4324 (odd - need to fix)
      { name: 'Elegant Silk Saree - Peach', price: 5100, discount: 10 } // 4590
    ]
  },
  'Linen Shirts & Pants': {
    range: '₹2,000 – ₹3,800',
    products: [
      { name: 'Classic Linen Shirt - White', price: 2000, discount: 0 }, // 2000
      { name: 'Formal Linen Shirt - Cream', price: 2500, discount: 5 }, // 2375 (odd - need fix)
      { name: 'Smart Linen Shirt - Beige', price: 3000, discount: 10 }, // 2700
      { name: 'Premium Linen Shirt - Navy', price: 3200, discount: 12 }, // 2816
      { name: 'Casual Linen Shirt - Light Blue', price: 2800, discount: 8 }, // 2576
      { name: 'Ethnic Fusion Shirt - Rust', price: 3400, discount: 15 }, // 2890
      { name: 'Formal Linen Pants - Grey', price: 2200, discount: 5 }, // 2090
      { name: 'Smart Office Pants - Black', price: 2600, discount: 10 }, // 2340
      { name: 'Casual Linen Pants - Khaki', price: 2900, discount: 8 }, // 2668
      { name: 'Premium Formal Pants - Charcoal', price: 3800, discount: 18 } // 3116
    ]
  },
  'Pashmina Stoles': {
    range: '₹2,800 – ₹5,000',
    products: [
      { name: 'Classic Pashmina Stole - Navy', price: 2800, discount: 0 }, // 2800
      { name: 'Luxury Pashmina Stole - Cream', price: 3200, discount: 5 }, // 3040
      { name: 'Premium Pashmina Stole - Beige', price: 3600, discount: 10 }, // 3240
      { name: 'Designer Pashmina Stole - Rose', price: 4000, discount: 12 }, // 3520
      { name: 'Elegant Pashmina Wrap - Peach', price: 4400, discount: 15 }, // 3740
      { name: 'Luxury Winter Wrap - Burgundy', price: 4800, discount: 18 }, // 3936
      { name: 'Pashmina Stole - Soft Grey', price: 3000, discount: 6 }, // 2820
      { name: 'Premium Pashmina - Blush Pink', price: 3400, discount: 10 }, // 3060
      { name: 'Elegant Wrap - Lavender', price: 3800, discount: 8 }, // 3496 (odd)
      { name: 'Luxury Pashmina Collection - Gold', price: 5000, discount: 20 } // 4000
    ]
  }
};

async function reorganizeWithCorrectPrices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📊 REORGANIZING ALL CATEGORIES WITH CORRECT PRICES\n');
    console.log('All prices must end in "0" and be within specified ranges.\n');

    // First, check what we have
    for (const [category, data] of Object.entries(newPriceStructures)) {
      console.log(`\n${category}`);
      console.log('='.repeat(60));
      console.log(`Range: ${data.range}`);
      console.log(`Required products: ${data.products.length}\n`);

      const products = data.products.map((item, i) => ({
        ...item,
        finalPrice: Math.round(item.price - (item.price * item.discount / 100))
      }));

      let oddPrices = [];
      products.forEach((p, i) => {
        const priceEndsIn0 = (p.price % 10 === 0);
        const finalPriceEndsIn0 = (p.finalPrice % 10 === 0);
        
        if (!priceEndsIn0 || !finalPriceEndsIn0) {
          oddPrices.push(`${i+1}. ${p.name}: ₹${p.price} → ₹${p.finalPrice}`);
        }
      });

      if (oddPrices.length > 0) {
        console.log('⚠️  Prices NOT ending in 0:');
        oddPrices.forEach(p => console.log(`   ${p}`));
      } else {
        console.log('✅ All prices end in 0');
      }
    }

    await mongoose.connection.close();
  } catch(e) {
    console.error('Error:', e.message);
  }
}

reorganizeWithCorrectPrices();
