const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

// Corrected price structures - ALL prices (before & after) end in 0
const correctedPriceStructures = {
  '100% Cotton Kurtas': {
    range: '₹1,800 – ₹2,800',
    products: [
      { name: 'Premium Cotton Kurta - White', price: 1800, discount: 0 }, // 1800→1800
      { name: 'Classic Cotton Kurta - Beige', price: 2000, discount: 0 }, // 2000→2000
      { name: 'Daily Wear Cotton Kurta - Navy', price: 2200, discount: 10 }, // 2200→1980
      { name: 'Festive Cotton Kurta - Maroon', price: 2400, discount: 0 }, // 2400→2400
      { name: 'Summer Cotton Kurta - Cream', price: 2000, discount: 5 }, // 2000→1900
      { name: 'Casual Cotton Kurta - Peach', price: 2600, discount: 0 }, // 2600→2600
      { name: 'Premium White Cotton - Pure', price: 2200, discount: 0 }, // 2200→2200
      { name: 'Cotton Kurta - Light Blue', price: 2400, discount: 5 }, // 2400→2280
      { name: 'Festival Cotton Kurta - Gold', price: 2000, discount: 10 }, // 2000→1800
      { name: 'Elegant Cotton Kurta - Rust', price: 2800, discount: 0 } // 2800→2800
    ]
  },
  'Chikankari Suits': {
    range: '₹2,500 – ₹4,500',
    products: [
      { name: 'Chikankari Suit - White', price: 2500, discount: 0 }, // 2500→2500
      { name: 'Chikankari Kurta - Cream', price: 3000, discount: 10 }, // 3000→2700
      { name: 'Hand Embroidered Suite - Peach', price: 3200, discount: 0 }, // 3200→3200
      { name: 'Designer Chikankari - Beige', price: 3600, discount: 0 }, // 3600→3600
      { name: 'Premium Chikankari Set - Pink', price: 4000, discount: 0 }, // 4000→4000
      { name: 'Elegant Chikankari - Ivory', price: 4200, discount: 10 }, // 4200→3780
      { name: 'Festival Chikankari - Baby Pink', price: 2800, discount: 5 }, // 2800→2660
      { name: 'Luxury Chikankari Suite - Powder Blue', price: 4400, discount: 0 }, // 4400→4400
      { name: 'Chikankari Suit - Mint Green', price: 3400, discount: 0 }, // 3400→3400
      { name: 'Embroidered Kurta Set - Ash Grey', price: 4500, discount: 0 } // 4500→4500
    ]
  },
  'Silk Sarees': {
    range: '₹3,500 – ₹5,500',
    products: [
      { name: 'Classic Silk Saree - Red', price: 3500, discount: 0 }, // 3500→3500
      { name: 'Banarasi Silk Saree - Gold', price: 4000, discount: 0 }, // 4000→4000
      { name: 'Festive Silk Saree - Maroon', price: 4200, discount: 10 }, // 4200→3780
      { name: 'Premium Silk Saree - Blue', price: 4600, discount: 0 }, // 4600→4600
      { name: 'Luxury Silk Saree - Purple', price: 5000, discount: 0 }, // 5000→5000
      { name: 'Wedding Silk Saree - Green', price: 4800, discount: 0 }, // 4800→4800
      { name: 'Silk Saree - Cream', price: 5200, discount: 10 }, // 5200→4680
      { name: 'Designer Silk Saree - Black', price: 5400, discount: 0 }, // 5400→5400
      { name: 'Party Silk Saree - Pink', price: 3800, discount: 0 }, // 3800→3800
      { name: 'Elegant Silk Saree - Peach', price: 5500, discount: 0 } // 5500→5500
    ]
  },
  'Linen Shirts & Pants': {
    range: '₹2,000 – ₹3,800',
    products: [
      { name: 'Classic Linen Shirt - White', price: 2000, discount: 0 }, // 2000→2000
      { name: 'Formal Linen Shirt - Cream', price: 2400, discount: 0 }, // 2400→2400
      { name: 'Smart Linen Shirt - Beige', price: 2600, discount: 0 }, // 2600→2600
      { name: 'Premium Linen Shirt - Navy', price: 3000, discount: 0 }, // 3000→3000
      { name: 'Casual Linen Shirt - Light Blue', price: 3200, discount: 0 }, // 3200→3200
      { name: 'Ethnic Fusion Shirt - Rust', price: 3400, discount: 10 }, // 3400→3060
      { name: 'Formal Linen Pants - Grey', price: 2200, discount: 0 }, // 2200→2200
      { name: 'Smart Office Pants - Black', price: 2800, discount: 0 }, // 2800→2800
      { name: 'Casual Linen Pants - Khaki', price: 3600, discount: 0 }, // 3600→3600
      { name: 'Premium Formal Pants - Charcoal', price: 3800, discount: 0 } // 3800→3800
    ]
  },
  'Pashmina Stoles': {
    range: '₹2,800 – ₹5,000',
    products: [
      { name: 'Classic Pashmina Stole - Navy', price: 2800, discount: 0 }, // 2800→2800
      { name: 'Luxury Pashmina Stole - Cream', price: 3200, discount: 0 }, // 3200→3200
      { name: 'Premium Pashmina Stole - Beige', price: 3600, discount: 0 }, // 3600→3600
      { name: 'Designer Pashmina Stole - Rose', price: 4000, discount: 0 }, // 4000→4000
      { name: 'Elegant Pashmina Wrap - Peach', price: 4200, discount: 10 }, // 4200→3780
      { name: 'Luxury Winter Wrap - Burgundy', price: 4600, discount: 0 }, // 4600→4600
      { name: 'Pashmina Stole - Soft Grey', price: 3000, discount: 0 }, // 3000→3000
      { name: 'Premium Pashmina - Blush Pink', price: 3400, discount: 0 }, // 3400→3400
      { name: 'Elegant Wrap - Lavender', price: 4400, discount: 0 }, // 4400→4400
      { name: 'Luxury Pashmina Collection - Gold', price: 5000, discount: 0 } // 5000→5000
    ]
  },
  'Accessories': {
    range: '₹100 – ₹500',
    products: [] // Keep existing
  }
};

async function validateCorrectedPrices() {
  try {
    console.log('🔍 VALIDATING CORRECTED PRICE STRUCTURES\n');

    for (const [category, data] of Object.entries(correctedPriceStructures)) {
      if (category === 'Accessories') continue;

      console.log(`\n${category}`);
      console.log('='.repeat(70));
      console.log(`Range: ${data.range}\n`);

      const products = data.products.map((item) => ({
        ...item,
        finalPrice: Math.round(item.price - (item.price * item.discount / 100))
      }));

      let allGood = true;
      let oddCount = 0;

      products.forEach((p, i) => {
        const priceEndsIn0 = (p.price % 10 === 0);
        const finalPriceEndsIn0 = (p.finalPrice % 10 === 0);
        const inRange = p.price >= (parseInt(data.range.split('–')[0].replace(/[₹,\s]/g, ''))) &&
                       p.price <= parseInt(data.range.split('–')[1].replace(/[₹,\s]/g, ''));

        if (!priceEndsIn0 || !finalPriceEndsIn0 || !inRange) {
          console.log(`❌ ${i+1}. ${p.name}: ₹${p.price}→₹${p.finalPrice} (ends: ${priceEndsIn0 ? '✓' : '✗'}, in range: ${inRange ? '✓' : '✗'})`);
          allGood = false;
          oddCount++;
        }
      });

      if (allGood) {
        console.log(`✅ ALL ${products.length} products are CORRECT`);
        products.forEach((p, i) => {
          if (i < 3 || i >= products.length - 1) {
            console.log(`   ${i+1}. ₹${p.price} → ₹${p.finalPrice}`);
          } else if (i === 3) {
            console.log(`   ...`);
          }
        });
      } else {
        console.log(`\n⚠️  ${oddCount} products with issues`);
      }
    }

  } catch(e) {
    console.error('Error:', e.message);
  }
}

validateCorrectedPrices();
