const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./src/models/Product");

const GROCERY_SEED_ITEMS = [
  // ── FRUITS & VEGETABLES ──
  {
    name: "Fresh Royal Gala Apples",
    description: "Crisp, sweet and juicy Royal Gala apples sourced from pristine orchards.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "4 pcs (approx. 500-600g)",
    packSize: "500g",
    price: 180,
    discount: 19,
    finalPrice: 145,
    stock: 60,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Robusta Bananas",
    description: "Naturally ripened Robusta bananas rich in potassium and energy.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "1 kg (approx. 6-7 pcs)",
    packSize: "1kg",
    price: 60,
    discount: 20,
    finalPrice: 48,
    stock: 75,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Hybrid Fresh Red Tomatoes",
    description: "Farm-fresh ripe red tomatoes ideal for salads, curries, and sauces.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "1 kg",
    packSize: "1kg",
    price: 45,
    discount: 28,
    finalPrice: 32,
    stock: 100,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh New Crop Potatoes",
    description: "Smooth, clean potatoes with firm texture, perfect for boiling, frying, and roasting.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "1 kg",
    packSize: "1kg",
    price: 35,
    discount: 25,
    finalPrice: 26,
    stock: 120,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Nashik Red Onions",
    description: "Pungent and flavorful grade-A red onions directly from Nashik farms.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "1 kg",
    packSize: "1kg",
    price: 50,
    discount: 24,
    finalPrice: 38,
    stock: 110,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Green Broccoli",
    description: "Nutrient-packed fresh green broccoli crowns rich in antioxidants.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "1 pc (approx. 250-350g)",
    packSize: "250g",
    price: 80,
    discount: 26,
    finalPrice: 59,
    stock: 45,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Crisp Green Capsicum",
    description: "Crunchy green bell peppers packed with vitamins A and C.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "500 g",
    packSize: "500g",
    price: 55,
    discount: 29,
    finalPrice: 39,
    stock: 55,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Farm Fresh Orange Carrots",
    description: "Sweet, crunchy and vitamin-A rich carrots for salads, juicing, and cooking.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "500 g",
    packSize: "500g",
    price: 40,
    discount: 30,
    finalPrice: 28,
    stock: 70,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Palak (Spinach)",
    description: "Tender green spinach leaves harvested fresh, full of iron and minerals.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "250 g bunch",
    packSize: "250g",
    price: 30,
    discount: 36,
    finalPrice: 19,
    stock: 80,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Yellow Lemons (Nimbu)",
    description: "Juicy, aromatic yellow lemons bursting with natural vitamin C.",
    category: "Fruits & Vegetables",
    categorySlug: "fruits-vegetables",
    brand: "Farm Fresh",
    unit: "6 pcs (approx. 200g)",
    packSize: "200g",
    price: 35,
    discount: 31,
    finalPrice: 24,
    stock: 90,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── BEST DEALS / FEATURED (Strictly matching Grosliy UI) ──
  {
    name: "Amul Fresh Milk",
    description: "Pasteurised toned milk with essential nutrients, calcium and vitamins.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "1 Ltr",
    packSize: "1L",
    price: 68,
    discount: 9,
    finalPrice: 62,
    stock: 80,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Tata Salt",
    description: "India's most trusted vacuum evaporated iodized salt for everyday cooking.",
    category: "Household Essentials",
    categorySlug: "household-essentials",
    brand: "TATA",
    unit: "1 kg",
    packSize: "1kg",
    price: 22,
    discount: 18,
    finalPrice: 18,
    stock: 120,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Maggi 2-Minute Noodles",
    description: "Classic delicious Maggi masala instant noodles with authentic spices.",
    category: "Snacks & Branded Foods",
    categorySlug: "snacks-branded-foods",
    brand: "Maggi",
    unit: "70 g",
    packSize: "100g",
    price: 15,
    discount: 20,
    finalPrice: 12,
    stock: 150,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Lays Classic Chips",
    description: "Crispy salted potato chips made with highest quality farm-grown potatoes.",
    category: "Snacks & Branded Foods",
    categorySlug: "snacks-branded-foods",
    brand: "Lay's",
    unit: "52 g",
    packSize: "100g",
    price: 25,
    discount: 20,
    finalPrice: 20,
    stock: 100,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Coca-Cola",
    description: "The refreshing, crisp taste of classic Coca-Cola in 750ml bottle.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "Coca-Cola",
    unit: "750 ml",
    packSize: "750ml",
    price: 60,
    discount: 25,
    finalPrice: 45,
    stock: 90,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Nestle KitKat",
    description: "Crisp wafer fingers covered with smooth milk chocolate.",
    category: "Snacks & Branded Foods",
    categorySlug: "snacks-branded-foods",
    brand: "Nestle",
    unit: "36 g",
    packSize: "100g",
    price: 40,
    discount: 25,
    finalPrice: 30,
    stock: 95,
    isFeaturedDeal: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── MORE DAIRY & BREAKFAST ──
  {
    name: "Amul Gold Full Cream Fresh Milk",
    description: "Amul Gold pasteurised full cream milk in a 500ml pouch with 6% fat.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 34,
    discount: 3,
    finalPrice: 33,
    stock: 120,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/amul_gold_milk.jpg",
      },
    ],
  },
  {
    name: "Amul Taaza Fresh Toned Milk",
    description: "Amul Taaza pasteurised fresh toned milk pouch rich in calcium and protein.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 28,
    discount: 4,
    finalPrice: 27,
    stock: 150,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/amul_taaza_milk.jpg",
      },
    ],
  },
  {
    name: "Amul Cow Fresh Milk",
    description: "Wholesome Amul cow milk pouch with pure goodness and easy digestibility.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 30,
    discount: 3,
    finalPrice: 29,
    stock: 100,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/amul_cow_milk.jpg",
      },
    ],
  },
  {
    name: "Mother Dairy Full Cream Fresh Milk",
    description: "Mother Dairy homogenised full cream milk packet with rich creamy texture.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Mother Dairy",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 34,
    discount: 3,
    finalPrice: 33,
    stock: 110,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/mother_dairy_full_cream_milk.jpg",
      },
    ],
  },
  {
    name: "Mother Dairy Toned Fresh Milk",
    description: "Mother Dairy pasteurised toned milk pouch enriched with vitamins A and D.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Mother Dairy",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 28,
    discount: 4,
    finalPrice: 27,
    stock: 130,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/mother_dairy_toned_milk.jpg",
      },
    ],
  },
  {
    name: "Nandini Fresh Toned Milk",
    description: "Nandini pure fresh pasteurised toned milk pouch from Karnataka Milk Federation.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Nandini",
    unit: "500 ml pouch",
    packSize: "500ml",
    price: 24,
    discount: 4,
    finalPrice: 23,
    stock: 90,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/nandini_toned_milk.jpg",
      },
    ],
  },
  {
    name: "Amul Taaza Homogenised Toned Milk",
    description: "Family size 1 Litre Amul Taaza fresh toned milk pouch.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "1 Ltr pouch",
    packSize: "1L",
    price: 56,
    discount: 4,
    finalPrice: 54,
    stock: 80,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/amul_taaza_milk.jpg",
      },
    ],
  },
  {
    name: "Mother Dairy Classic Cow Milk",
    description: "Nutritious and light 1 Litre cow milk pouch from Mother Dairy.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Mother Dairy",
    unit: "1 Ltr pouch",
    packSize: "1L",
    price: 60,
    discount: 5,
    finalPrice: 57,
    stock: 75,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/mother_dairy_toned_milk.jpg",
      },
    ],
  },
  {
    name: "Amul Salted Butter",
    description: "Creamy, delicious salted butter made from fresh cream.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "500 g carton",
    packSize: "500g",
    price: 275,
    discount: 7,
    finalPrice: 255,
    stock: 60,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Ready to Cook Shahi Paneer",
    description: "Rich, creamy cottage cheese in a decadent tomato and cashew gravy.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Amul",
    unit: "300 g pack",
    packSize: "300g",
    price: 135,
    discount: 15,
    finalPrice: 115,
    stock: 50,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Farm White Eggs",
    description: "High protein, hygienically cleaned farm fresh eggs in a protective carton.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Farm Fresh",
    unit: "6 pcs pack",
    packSize: "Pack of 6",
    price: 55,
    discount: 18,
    finalPrice: 45,
    stock: 100,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Mother Dairy Classic Curd",
    description: "Thick, creamy and fresh curd prepared from pasteurised toned milk.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Mother Dairy",
    unit: "400 g tub",
    packSize: "400g",
    price: 45,
    discount: 11,
    finalPrice: 40,
    stock: 65,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Britannia Gourmet Cheese Block",
    description: "Rich and creamy natural processed cheddar cheese block for slicing and melting.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Britannia",
    unit: "200 g block",
    packSize: "200g",
    price: 155,
    discount: 13,
    finalPrice: 135,
    stock: 40,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Kellogg's Corn Flakes Original",
    description: "Crispy, golden toasted corn flakes packed with essential vitamins and iron.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Kellogg's",
    unit: "475 g box",
    packSize: "500g",
    price: 215,
    discount: 14,
    finalPrice: 185,
    stock: 50,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Golden Toast Slices",
    description: "Crispy golden oven-toasted butter bread slices, ideal for morning breakfast.",
    category: "Dairy & Breakfast",
    categorySlug: "dairy-breakfast",
    brand: "Britannia",
    unit: "300 g pack",
    packSize: "300g",
    price: 65,
    discount: 15,
    finalPrice: 55,
    stock: 45,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── MORE SNACKS ──
  {
    name: "Haldiram's Crispy Cocktail Samosas",
    description: "Authentic crispy golden triangular pastry puffs filled with spiced potato and peas.",
    category: "Snacks & Branded Foods",
    categorySlug: "snacks-branded-foods",
    brand: "Haldiram's",
    unit: "12 pcs (approx. 350g)",
    packSize: "350g",
    price: 130,
    discount: 15,
    finalPrice: 110,
    stock: 65,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Oreo Vanilla Creme Sandwich Biscuits",
    description: "Rich dark chocolate sandwich biscuits layered with smooth vanilla cream.",
    category: "Snacks & Branded Foods",
    categorySlug: "snacks-branded-foods",
    brand: "Cadbury",
    unit: "120 g pack",
    packSize: "100g",
    price: 35,
    discount: 17,
    finalPrice: 29,
    stock: 75,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/oreo_cookies.jpg",
      },
    ],
  },

  // ── MORE BEVERAGES ──
  {
    name: "Sprite Lemon-Lime Drink",
    description: "Crisp, clean taste of lemon-lime carbonated drink in 750ml bottle.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "Coca-Cola",
    unit: "750 ml bottle",
    packSize: "750ml",
    price: 60,
    discount: 25,
    finalPrice: 45,
    stock: 80,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Tropicana 100% Orange Juice",
    description: "Pure 100% orange juice with no added sugar or preservatives.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "Tropicana",
    unit: "1 Ltr tetra pack",
    packSize: "1L",
    price: 140,
    discount: 18,
    finalPrice: 115,
    stock: 50,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Tata Tea Gold Premium Black Tea",
    description: "Rich aroma and great taste made with gently rolled long leaves.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "TATA",
    unit: "500 g pouch",
    packSize: "500g",
    price: 310,
    discount: 15,
    finalPrice: 265,
    stock: 65,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Nescafe Classic Instant Coffee",
    description: "100% pure coffee beans expertly roasted for a rich, aromatic morning brew.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "Nestle",
    unit: "100 g glass jar",
    packSize: "100g",
    price: 220,
    discount: 11,
    finalPrice: 195,
    stock: 50,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Bisleri Mineral Drinking Water",
    description: "Pure, ozonated natural mineral drinking water bottle.",
    category: "Beverages",
    categorySlug: "beverages",
    brand: "Bisleri",
    unit: "1 Ltr bottle",
    packSize: "1L",
    price: 20,
    discount: 10,
    finalPrice: 18,
    stock: 150,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── HOUSEHOLD ESSENTIALS ──
  {
    name: "Surf Excel Matic Front Load Detergent",
    description: "Advanced liquid detergent that dissolves 100% in water without residue.",
    category: "Household Essentials",
    categorySlug: "household-essentials",
    brand: "Surf Excel",
    unit: "1 Ltr bottle",
    packSize: "1L",
    price: 240,
    discount: 17,
    finalPrice: 199,
    stock: 45,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Vim Lemon Fresh Dishwash Gel",
    description: "Powerful concentrated dishwash gel with the grease-cutting power of lemons.",
    category: "Household Essentials",
    categorySlug: "household-essentials",
    brand: "Vim",
    unit: "500 ml bottle",
    packSize: "500ml",
    price: 125,
    discount: 21,
    finalPrice: 99,
    stock: 75,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/vim_dishwash_gel.jpg",
      },
    ],
  },
  {
    name: "Lizol Citrus Floor Cleaner",
    description: "Disinfectant surface cleaner that kills 99.9% germs and leaves a fresh scent.",
    category: "Household Essentials",
    categorySlug: "household-essentials",
    brand: "Lizol",
    unit: "1 Ltr bottle",
    packSize: "1L",
    price: 210,
    discount: 17,
    finalPrice: 175,
    stock: 55,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── PERSONAL CARE ──
  {
    name: "Dettol Original Germ Protection Soap",
    description: "Dettol trusted protection against illness-causing germs.",
    category: "Personal Care",
    categorySlug: "personal-care",
    brand: "Dettol",
    unit: "125 g (Pack of 3)",
    packSize: "Pack of 3",
    price: 165,
    discount: 18,
    finalPrice: 135,
    stock: 65,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Curology Daily Skincare Cleanser & Moisturizer Set",
    description: "Gentle daily cleanser and rich hydrating moisturizer duo for smooth skin.",
    category: "Personal Care",
    categorySlug: "personal-care",
    brand: "Curology",
    unit: "2-piece set in box",
    packSize: "Set of 2",
    price: 499,
    discount: 20,
    finalPrice: 399,
    stock: 35,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Oral Care Advanced White Toothpaste & Brush",
    description: "Enamel shield fluoride toothpaste paired with deep-cleaning precision toothbrush.",
    category: "Personal Care",
    categorySlug: "personal-care",
    brand: "Colgate",
    unit: "75 ml tube + brush",
    packSize: "1 Set",
    price: 150,
    discount: 20,
    finalPrice: 120,
    stock: 80,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/colgate_toothpaste.jpg",
      },
    ],
  },

  // ── BABY CARE ──
  {
    name: "Pampers All Round Protection Diapers",
    description: "Ultra-absorbent breathable baby diaper pants with anti-rash lotion.",
    category: "Baby Care",
    categorySlug: "baby-care",
    brand: "Pampers",
    unit: "Medium (54 Pants)",
    packSize: "Pack of 54",
    price: 899,
    discount: 19,
    finalPrice: 729,
    stock: 35,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Tender Cloud Gentle Baby Wash & Shampoo",
    description: "Tear-free, hypoallergenic oat and chamomile baby wash & shampoo.",
    category: "Baby Care",
    categorySlug: "baby-care",
    brand: "Johnson's",
    unit: "250 ml pump bottle",
    packSize: "250ml",
    price: 195,
    discount: 15,
    finalPrice: 165,
    stock: 45,
    isFeaturedDeal: false,
    images: [
      {
        url: "/images/products/baby_shampoo.jpg",
      },
    ],
  },

  // ── BAKERY & CAKES ──
  {
    name: "Britannia 100% Whole Wheat Brown Bread",
    description: "Wholesome brown bread made with 100% whole wheat flour.",
    category: "Bakery & Cakes",
    categorySlug: "bakery-cakes",
    brand: "Britannia",
    unit: "400 g pack",
    packSize: "400g",
    price: 55,
    discount: 13,
    finalPrice: 48,
    stock: 70,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Dutch Chocolate Truffle Cake",
    description: "Decadent layered dark chocolate cake coated with rich chocolate truffle fudge.",
    category: "Bakery & Cakes",
    categorySlug: "bakery-cakes",
    brand: "Grosliy Bakery",
    unit: "500 g cake",
    packSize: "500g",
    price: 499,
    discount: 20,
    finalPrice: 399,
    stock: 20,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ── MEAT & SEAFOOD ──
  {
    name: "Fresh Boneless Chicken Breast",
    description: "Tender, succulent and hormone-free boneless chicken breast cuts.",
    category: "Meat & Seafood",
    categorySlug: "meat-seafood",
    brand: "Fresh Cuts",
    unit: "500 g tray",
    packSize: "500g",
    price: 190,
    discount: 16,
    finalPrice: 160,
    stock: 30,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Fresh Atlantic Salmon Fish Fillet",
    description: "Premium omega-3 rich Atlantic salmon fish fillet with skin on.",
    category: "Meat & Seafood",
    categorySlug: "meat-seafood",
    brand: "Fresh Cuts",
    unit: "350 g fillet",
    packSize: "350g",
    price: 350,
    discount: 14,
    finalPrice: 299,
    stock: 25,
    isFeaturedDeal: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];

async function seedGroceryProducts() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI not found in .env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas!");

    console.log("Cleaning and updating grocery products in MongoDB...");

    // Remove obsolete items and re-sync
    await Product.deleteMany({});

    let count = 0;
    for (const item of GROCERY_SEED_ITEMS) {
      await Product.create(item);
      count++;
    }

    console.log(`✅ Successfully seeded ${count} perfectly matched grocery products into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
}

seedGroceryProducts();
