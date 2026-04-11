require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const mongoUrl = process.env.MONGO_URI || process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce';

// Images data
const uploadedAccessoriesImages = {
  Cap: [
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718500/Accessories/Cap/2nd%20summmer%20cap.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718502/Accessories/Cap/all%20cap.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718502/Accessories/Cap/cap%20summer.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718504/Accessories/Cap/cap%20winter.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718505/Accessories/Cap/cap%20women.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718506/Accessories/Cap/cap.jpg"
  ],
  Dupatta: [
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718507/Accessories/Dupatta/bandhani%20duppata.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718508/Accessories/Dupatta/bandhej-art%20dupatta.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718509/Accessories/Dupatta/brideal%20red%20net%20Dupatta.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718510/Accessories/Dupatta/cotton%20dupatta.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718511/Accessories/Dupatta/mirror%20work%20Dupatta.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718512/Accessories/Dupatta/multi%20colour%20Dupatta.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718513/Accessories/Dupatta/multicolor-bandhej-cotton-dupatta.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718514/Accessories/Dupatta/pink%20cotton%20dupatta.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718515/Accessories/Dupatta/printed-cotton-dupatta.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718516/Accessories/Dupatta/pure%20cotton%20dupatta.jpeg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718517/Accessories/Dupatta/silk%20black%20dupatta.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718518/Accessories/Dupatta/white%20and%20pink%20cotton%20Dupatta.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718519/Accessories/Dupatta/white%20cotton%20dupatta.jpg"
  ],
  Socks: [
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718520/Accessories/Socks/cotton%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718521/Accessories/Socks/cotton%20stretch%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718522/Accessories/Socks/cut%20peds%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718523/Accessories/Socks/girls%20multicolor%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718524/Accessories/Socks/kids-shocks.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718525/Accessories/Socks/mens%20comfortable%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718526/Accessories/Socks/mens%20cut%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718527/Accessories/Socks/multicolor%20socks.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718528/Accessories/Socks/printed%20cut%20shocks.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718529/Accessories/Socks/rose%20design%20women%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718530/Accessories/Socks/women%20shocks.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718531/Accessories/Socks/white%20shock%20mens.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718533/Accessories/Socks/football%20shocks.webp"
  ],
  Napkin: [
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718524/Accessories/Napkin/baby%20napkin%20multicolor.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718525/Accessories/Napkin/baby%20cloth%20napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718526/Accessories/Napkin/body%20face%20napkin.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718527/Accessories/Napkin/cotton%20face%20napkin.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718528/Accessories/Napkin/cotton%20kichen%20napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718529/Accessories/Napkin/cotton%20napkin%20%20face.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718530/Accessories/Napkin/diner%20napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718531/Accessories/Napkin/kitchen%20napkin.webp",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718532/Accessories/Napkin/multiy%20type%20napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718533/Accessories/Napkin/napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718534/Accessories/Napkin/napkins.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718535/Accessories/Napkin/plain%20white%20cotton%20napkin.jpg",
    "https://res.cloudinary.com/ddixgkvso/image/upload/v1775718536/Accessories/Napkin/white%20napkin.jpg"
  ]
};

// Helper function to get random image from category
function getRandomImage(category) {
  const images = uploadedAccessoriesImages[category];
  return images[Math.floor(Math.random() * images.length)];
}



const accessoriesProducts = [
  // CAPS (Price range: 300-500)
  {
    name: "Classic Summer Cap",
    description: "Breathable fabric summer cap perfect for outdoor activities and casual wear.",
    price: 350,
    discount: 15,
    category: "Accessories",
    sizes: [],
    colors: ["Black", "Blue", "White"],
    stock: 50,
    images: [
      {
        url: getRandomImage("Cap"),
        public_id: "Accessories/Cap/classic-summer-1"
      }
    ]
  },
  {
    name: "Winter Wool Cap - Navy",
    description: "Premium wool winter cap with warm lining and comfortable fit.",
    price: 450,
    discount: 20,
    category: "Accessories",
    sizes: [],
    colors: ["Navy", "Grey", "Black"],
    stock: 45,
    images: [
      {
        url: getRandomImage("Cap"),
        public_id: "Accessories/Cap/winter-wool-1"
      }
    ]
  },
  {
    name: "Women's Fashion Cap - Pink",
    description: "Stylish women's cap with adjustable strap and fashionable design.",
    price: 400,
    discount: 18,
    category: "Accessories",
    sizes: [],
    colors: ["Pink", "Purple", "Beige"],
    stock: 55,
    images: [
      {
        url: getRandomImage("Cap"),
        public_id: "Accessories/Cap/womens-fashion-1"
      }
    ]
  },

  // DUPATTAS (Price range: 400-800)
  {
    name: "Bandhani Cotton Dupatta - Red",
    description: "Traditional bandhani print dupatta made from pure cotton, perfect for festive occasions.",
    price: 600,
    discount: 16,
    category: "Accessories",
    sizes: [],
    colors: ["Red", "Purple", "Blue"],
    stock: 40,
    images: [
      {
        url: getRandomImage("Dupatta"),
        public_id: "Accessories/Dupatta/bandhani-cotton-1"
      }
    ]
  },
  {
    name: "Mirror Work Dupatta - Gold",
    description: "Elegant dupatta with mirror work embellishment, ideal for weddings and celebrations.",
    price: 700,
    discount: 22,
    category: "Accessories",
    sizes: [],
    colors: ["Gold", "Pink", "Green"],
    stock: 35,
    images: [
      {
        url: getRandomImage("Dupatta"),
        public_id: "Accessories/Dupatta/mirror-work-1"
      }
    ]
  },
  {
    name: "Silk Printed Dupatta - Black",
    description: "Premium silk dupatta with beautiful printed designs and smooth texture.",
    price: 750,
    discount: 20,
    category: "Accessories",
    sizes: [],
    colors: ["Black", "Navy", "Maroon"],
    stock: 38,
    images: [
      {
        url: getRandomImage("Dupatta"),
        public_id: "Accessories/Dupatta/silk-printed-1"
      }
    ]
  },
  {
    name: "Pure Cotton Dupatta - White",
    description: "Simple yet elegant pure cotton dupatta suitable for everyday wear.",
    price: 500,
    discount: 12,
    category: "Accessories",
    sizes: [],
    colors: ["White", "Cream", "Beige"],
    stock: 60,
    images: [
      {
        url: getRandomImage("Dupatta"),
        public_id: "Accessories/Dupatta/pure-cotton-1"
      }
    ]
  },
  {
    name: "Embroidered Dupatta - Multi",
    description: "Beautiful embroidered dupatta with intricate patterns.",
    price: 550,
    discount: 14,
    category: "Accessories",
    sizes: [],
    colors: ["Multi", "Green", "Red"],
    stock: 42,
    images: [
      {
        url: getRandomImage("Dupatta"),
        public_id: "Accessories/Dupatta/embroidered-1"
      }
    ]
  },

  // SOCKS (Price range: 100-300)
  {
    name: "Cotton Multicolor Socks Pack - 3 Pairs",
    description: "Comfortable cotton socks with multicolor patterns, pack of 3 pairs.",
    price: 200,
    discount: 15,
    category: "Accessories",
    sizes: [],
    colors: ["Multicolor"],
    stock: 100,
    images: [
      {
        url: getRandomImage("Socks"),
        public_id: "Accessories/Socks/cotton-multicolor-1"
      }
    ]
  },
  {
    name: "Men's Formal Dress Socks - Black",
    description: "Premium quality formal dress socks for office and semi-formal wear.",
    price: 250,
    discount: 18,
    category: "Accessories",
    sizes: [],
    colors: ["Black", "Navy", "Brown"],
    stock: 80,
    images: [
      {
        url: getRandomImage("Socks"),
        public_id: "Accessories/Socks/formal-black-1"
      }
    ]
  },
  {
    name: "Women's Fashion Socks - Multi",
    description: "Stylish women's socks with trendy designs and perfect fit.",
    price: 180,
    discount: 12,
    category: "Accessories",
    sizes: [],
    colors: ["Multiple"],
    stock: 90,
    images: [
      {
        url: getRandomImage("Socks"),
        public_id: "Accessories/Socks/womens-fashion-1"
      }
    ]
  },
  {
    name: "Kids Sports Socks - Blue",
    description: "Durable sports socks designed for active kids with breathable fabric.",
    price: 150,
    discount: 14,
    category: "Accessories",
    sizes: [],
    colors: ["Blue", "Red", "Green"],
    stock: 75,
    images: [
      {
        url: getRandomImage("Socks"),
        public_id: "Accessories/Socks/kids-sports-1"
      }
    ]
  },

  // NAPKINS (Price range: 50-200)
  {
    name: "Cotton Face Napkins Pack - 12",
    description: "Soft cotton napkins perfect for gentle facial care, pack of 12.",
    price: 120,
    discount: 16,
    category: "Accessories",
    sizes: [],
    colors: ["White"],
    stock: 150,
    images: [
      {
        url: getRandomImage("Napkin"),
        public_id: "Accessories/Napkin/face-napkins-1"
      }
    ]
  },
  {
    name: "Cotton Kitchen Napkins - 6 Pack",
    description: "Durable cotton kitchen napkins for everyday use, pack of 6.",
    price: 100,
    discount: 12,
    category: "Accessories",
    sizes: [],
    colors: ["White", "Beige"],
    stock: 120,
    images: [
      {
        url: getRandomImage("Napkin"),
        public_id: "Accessories/Napkin/kitchen-napkins-1"
      }
    ]
  },
  {
    name: "Premium Dining Napkins - White",
    description: "Premium quality dining napkins with smooth finish for formal occasions.",
    price: 180,
    discount: 20,
    category: "Accessories",
    sizes: [],
    colors: ["Cream", "White"],
    stock: 80,
    images: [
      {
        url: getRandomImage("Napkin"),
        public_id: "Accessories/Napkin/dining-napkins-1"
      }
    ]
  },
  {
    name: "Multicolor Baby Napkins - Safe",
    description: "Soft and safe multicolor napkins specially designed for babies.",
    price: 150,
    discount: 14,
    category: "Accessories",
    sizes: [],
    colors: ["Multicolor"],
    stock: 100,
    images: [
      {
        url: getRandomImage("Napkin"),
        public_id: "Accessories/Napkin/baby-napkins-1"
      }
    ]
  }
];

async function seedAccessories() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Delete existing accessories
    await Product.deleteMany({ category: 'Accessories' });
    console.log('🗑️  Cleared existing Accessories products');

    // Insert products directly (finalPrice is calculated in Product.js pre-save hook)
    const inserted = await Product.insertMany(accessoriesProducts);
    console.log(`✅ Inserted ${inserted.length} Accessories products\n`);

    // Display summary
    console.log('--- ACCESSORIES PRODUCTS SUMMARY ---\n');
    let totalByType = { 'Cap': 0, 'Dupatta': 0, 'Socks': 0, 'Napkin': 0 };
    
    inserted.forEach(product => {
      const type = product.name.includes('Cap') ? 'Cap' : 
                   product.name.includes('Dupatta') ? 'Dupatta' :
                   product.name.includes('Socks') ? 'Socks' : 'Napkin';
      totalByType[type]++;
      
      console.log(`${product.name}`);
      console.log(`  Price: ₹${product.price} → Final: ₹${product.finalPrice}`);
      console.log(`  Image: ${product.images[0].url.substring(0, 80)}...`);
      console.log(`  Stock: ${product.stock}\n`);
    });

    console.log('--- BREAKDOWN ---');
    Object.entries(totalByType).forEach(([type, count]) => {
      console.log(`${type}: ${count} products`);
    });

    console.log(`\n✅ Successfully seeded ${inserted.length} Accessories products`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding accessories:', error.message);
    process.exit(1);
  }
}

seedAccessories();
