/**
 * Seed 280 fashion products (20 per category × 14 categories)
 * Images stored as direct Unsplash URLs — no Cloudinary upload needed.
 * Usage: node src/scripts/seedProducts.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Curated Unsplash photo IDs by category
const PHOTOS = {
  "Women's Wear": [
    'photo-1483985988355-763728e1935b',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1469334031218-e382a71b716b',
    'photo-1551488831-00ddcb6c6bd3',
    'photo-1567401893414-76b7b1e5a7a5',
    'photo-1590330297626-d7aff25a0431',
    'photo-1594744803329-e58b31de8bf5',
    'photo-1539109136881-3be0616acf4b',
    'photo-1524504388940-b1c1722653e1',
    'photo-1496747611176-843222e1e57c',
  ],
  "Men's Wear": [
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1512374382149-233c42b6a83b',
    'photo-1617137968427-85924c800a22',
    'photo-1603252109303-2751441dd157',
    'photo-1490578474895-699cd4e2cf59',
    'photo-1553143820-6bbde1f7e96a',
    'photo-1598033129183-c4f50c736f10',
    'photo-1617196034183-421b4040ed20',
    'photo-1552374196-1ab2a1c593e8',
    'photo-1519085360753-af0119f7cbe7',
  ],
  "Kids' Wear": [
    'photo-1503454537195-1dcabb73ffb9',
    'photo-1519457431-44ccd64a579b',
    'photo-1518831959646-742c3a14ebf7',
    'photo-1471286174890-9c112ac6476b',
    'photo-1476703993599-0035a21b17a9',
    'photo-1505944357431-27579db47558',
    'photo-1518611012118-696072aa579a',
    'photo-1606107557195-0e29a4b5b4aa',
    'photo-1519963703975-5ce4e2e5a03c',
    'photo-1558618666-fcd25c85cd64',
  ],
  'Ethnic Wear': [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1595777457583-95e059d581b8',
    'photo-1610030177698-79f9f8f6d8b8',
    'photo-1587393855524-087f83d95bc9',
    'photo-1594938298603-c8148c4b4c7a',
    'photo-1609151354611-f5d27c84d0e0',
    'photo-1585073216112-4985ace02ad3',
    'photo-1605296867304-46d5465a13f1',
    'photo-1618354691373-d851c5c3a990',
    'photo-1614676471928-2ed0ad1061a4',
  ],
  'Western Wear': [
    'photo-1490481651871-ab68de25d43d',
    'photo-1445205170230-053b83016050',
    'photo-1520367445093-50dc08a59d9d',
    'photo-1434389677669-e08b4cac3105',
    'photo-1583744946564-b52ac1c389c8',
    'photo-1478145046317-39f10e56b5e9',
    'photo-1496217590455-aa63a8350eea',
    'photo-1524230507669-5ff97c998513',
    'photo-1509631179647-0177331693ae',
    'photo-1548036328-c9fa89d128fa',
  ],
  'Footwear': [
    'photo-1542291026-7eec264c27ff',
    'photo-1560769629-975ec94e6a86',
    'photo-1491553895911-0055eca6402d',
    'photo-1543163521-1bf539c55dd2',
    'photo-1606107557195-0e29a4b5b4aa',
    'photo-1595950653106-6c9ebd614d3a',
    'photo-1525966222134-fcfa99b8ae77',
    'photo-1608231387042-66d1773070a5',
    'photo-1516478177764-9fe5bd7e9717',
    'photo-1507464098880-e367bc5d2c08',
  ],
  'Accessories': [
    'photo-1523779105320-d1cd346ff52b',
    'photo-1611591437281-460bfbe1220a',
    'photo-1508214751196-bcfd4ca60f91',
    'photo-1584917865442-de89df76afd3',
    'photo-1553062407-98eeb64c6a62',
    'photo-1550639525-c97d455acf70',
    'photo-1572635196237-14b3f281503f',
    'photo-1509941943102-10c232535736',
    'photo-1434510423563-c8c8c5c8b673',
    'photo-1548036328-c9fa89d128fa',
  ],
  'Bags & Handbags': [
    'photo-1548036328-c9fa89d128fa',
    'photo-1553062407-98eeb64c6a62',
    'photo-1575032617751-6ddec2089882',
    'photo-1584917865442-de89df76afd3',
    'photo-1566150905458-1bf1fc113f0d',
    'photo-1590739293931-a8a25ac1a1eb',
    'photo-1560243563-062bfc001d68',
    'photo-1622560480605-d83c853bc5c3',
    'photo-1473188588951-666fce8e7c68',
    'photo-1614179818511-1b2c2e4b07aa',
  ],
  'Jewellery': [
    'photo-1515562141207-7a88fb7ce338',
    'photo-1584302179602-e4c3d3fd629d',
    'photo-1599643478518-a784e5dc4c8f',
    'photo-1602173574767-37ac01994b2a',
    'photo-1535632066927-ab7c9ab60908',
    'photo-1611591437281-460bfbe1220a',
    'photo-1617038260897-41a1f14a8ca0',
    'photo-1583744946564-b52ac1c389c8',
    'photo-1508214751196-bcfd4ca60f91',
    'photo-1574699800374-1c2c6ade2af5',
  ],
  'Activewear': [
    'photo-1571019613454-1cb2f99b2d8b',
    'photo-1526506118085-60ce8714f8c5',
    'photo-1518611012118-696072aa579a',
    'photo-1554284126-aa88f22d8b74',
    'photo-1517836357463-d25dfeac3438',
    'photo-1548690312-e3b507d8c110',
    'photo-1576678927484-cc907957088c',
    'photo-1584735935682-2f2b69dff9d2',
    'photo-1521805103424-d8f8430e8933',
    'photo-1594381898411-846e7d193883',
  ],
  'Innerwear & Sleepwear': [
    'photo-1567401893414-76b7b1e5a7a5',
    'photo-1594744803329-e58b31de8bf5',
    'photo-1483985988355-763728e1935b',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1469334031218-e382a71b716b',
    'photo-1551488831-00ddcb6c6bd3',
    'photo-1590330297626-d7aff25a0431',
    'photo-1539109136881-3be0616acf4b',
    'photo-1524504388940-b1c1722653e1',
    'photo-1496747611176-843222e1e57c',
  ],
  'Winter Wear': [
    'photo-1544966503-7cc5ac882d5f',
    'photo-1548624313-0396a53571b3',
    'photo-1520367445093-50dc08a59d9d',
    'photo-1511485977113-f34c92461ad9',
    'photo-1605296867304-46d5465a13f1',
    'photo-1580402427914-a6cc60d7d44f',
    'photo-1519058082700-08a9f621d9b5',
    'photo-1483118714900-540cf339fd46',
    'photo-1617196034096-2a8fbb9db8e0',
    'photo-1517956049986-15a35ab85a1a',
  ],
  'Sarees': [
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1595777457583-95e059d581b8',
    'photo-1610030177698-79f9f8f6d8b8',
    'photo-1587393855524-087f83d95bc9',
    'photo-1594938298603-c8148c4b4c7a',
    'photo-1609151354611-f5d27c84d0e0',
    'photo-1618354691373-d851c5c3a990',
    'photo-1614676471928-2ed0ad1061a4',
    'photo-1605296867304-46d5465a13f1',
    'photo-1583391733956-3750e0ff4e8b',
  ],
  'Kurtas & Suits': [
    'photo-1585073216112-4985ace02ad3',
    'photo-1609151354611-f5d27c84d0e0',
    'photo-1583391733956-3750e0ff4e8b',
    'photo-1605296867304-46d5465a13f1',
    'photo-1618354691373-d851c5c3a990',
    'photo-1614676471928-2ed0ad1061a4',
    'photo-1595777457583-95e059d581b8',
    'photo-1594938298603-c8148c4b4c7a',
    'photo-1610030177698-79f9f8f6d8b8',
    'photo-1587393855524-087f83d95bc9',
  ],
};

const imgUrl = (photoId) =>
  `https://images.unsplash.com/${photoId}?w=800&h=800&fit=crop&q=80`;

const PRODUCTS = [
  // ─── Women's Wear (20) ───
  { name: "Zara Floral Midi Dress", category: "Women's Wear", price: 2499, discount: 20, stock: 80, description: "Elegant floral print midi dress with V-neckline and flutter sleeves. Lightweight chiffon fabric, perfect for casual outings and brunches.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "H&M Slim Fit Blazer", category: "Women's Wear", price: 3499, discount: 15, stock: 60, description: "Tailored slim-fit blazer in premium woven fabric. Single-button fastening, notched lapels, and two side pockets. Office to evening wear.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Mango Wrap Maxi Skirt", category: "Women's Wear", price: 1999, discount: 25, stock: 90, description: "Flowy maxi skirt with wrap-around design and adjustable tie waist. Viscose fabric drapes beautifully for an effortless look.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "AND Polka Dot Blouse", category: "Women's Wear", price: 999, discount: 10, stock: 110, description: "Playful polka dot print blouse with tie-front detail. Regular fit, short sleeves, perfect to pair with jeans or trousers.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Global Desi Embroidered Top", category: "Women's Wear", price: 1299, discount: 30, stock: 75, description: "Boho-inspired embroidered top with flared sleeves and round neck. 100% cotton, breathable and comfortable for all-day wear.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "W for Woman Palazzo Set", category: "Women's Wear", price: 1799, discount: 20, stock: 65, description: "Printed palazzo set with matching top. Comfortable elastic waistband and ankle-length flared pants. Ideal for casual and festive occasions.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Biba Anarkali Kurta", category: "Women's Wear", price: 2199, discount: 15, stock: 55, description: "Beautiful Anarkali kurta with intricate embroidery at the yoke. Made from cotton blend, comes with straight pants.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Vero Moda Off-Shoulder Top", category: "Women's Wear", price: 899, discount: 40, stock: 100, description: "Trendy off-shoulder top with smocking detail. Relaxed fit and elasticated neckline for comfortable wear throughout the day.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Forever 21 Denim Jumpsuit", category: "Women's Wear", price: 2799, discount: 20, stock: 45, description: "Classic denim jumpsuit with button-front closure and adjustable straps. Multiple pockets, versatile styling for day and night.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Marks & Spencer Linen Trousers", category: "Women's Wear", price: 2499, discount: 10, stock: 70, description: "Comfortable linen-blend straight-leg trousers with elasticated waist. Breathable fabric ideal for warm weather.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Rare Rabbit Crop Shirt", category: "Women's Wear", price: 1499, discount: 15, stock: 85, description: "Contemporary cropped shirt with spread collar and relaxed silhouette. Premium cotton for everyday comfort and style.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Fusion Beats Wrap Dress", category: "Women's Wear", price: 1899, discount: 25, stock: 60, description: "Vibrant wrap dress with self-tie waist and V-neck. Midi length with a slight flare — ideal for work or casual outings.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Pantaloons Flared Jeans", category: "Women's Wear", price: 1699, discount: 20, stock: 90, description: "70s-inspired high-rise flared jeans in stretch denim. Comfortable fit with button closure and five-pocket styling.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Aurelia Pintuck Kurta", category: "Women's Wear", price: 1599, discount: 30, stock: 80, description: "Classic A-line kurta with subtle pintuck detailing. Pure cotton, straight hem with side slits, pairs well with leggings or palazzos.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Meena Bazaar Silk Blouse", category: "Women's Wear", price: 1299, discount: 20, stock: 50, description: "Lustrous silk blouse with embroidered collar and three-quarter sleeves. Perfect for festive occasions and celebrations.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Indya Crop Jacket", category: "Women's Wear", price: 2099, discount: 15, stock: 65, description: "Bohemian-inspired cropped jacket with mirror work embellishments. Pairs beautifully with ethnic or western outfits.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Saundh Straight Kurta", category: "Women's Wear", price: 1799, discount: 10, stock: 70, description: "Minimalist straight-cut kurta in breathable cotton. Simple embroidery at the neckline. Available in earthy tones.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Pomcha Jaipur Lehenga Top", category: "Women's Wear", price: 3299, discount: 20, stock: 40, description: "Flowy lehenga-style top with hand-block print. Lightweight and breezy, perfect for summer festivities.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Nykaa Fashion Ruffle Dress", category: "Women's Wear", price: 1999, discount: 30, stock: 55, description: "Chic ruffle-tiered dress with spaghetti straps. Floral print on georgette fabric, great for parties and date nights.", photos: ["Women's Wear", "Women's Wear"] },
  { name: "Tokyo Talkies Halter Neck Top", category: "Women's Wear", price: 799, discount: 35, stock: 95, description: "Trendy halter neck top with tied back detail. Strappy design, perfect for beach outings and summer parties.", photos: ["Women's Wear", "Women's Wear"] },

  // ─── Men's Wear (20) ───
  { name: "Allen Solly Slim Fit Chinos", category: "Men's Wear", price: 1999, discount: 20, stock: 100, description: "Premium slim-fit chinos in stretch cotton blend. Five-pocket styling with clean finish. Perfect for casual and semi-formal occasions.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Peter England Oxford Shirt", category: "Men's Wear", price: 1499, discount: 15, stock: 120, description: "Classic Oxford weave button-down shirt with button-down collar. 100% cotton, wrinkle-resistant for all-day freshness.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Louis Philippe Blazer", category: "Men's Wear", price: 5999, discount: 10, stock: 40, description: "Sophisticated single-breasted blazer in textured fabric. Notch lapels, two-button closure, ideal for formal and business meetings.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Van Heusen Formal Trousers", category: "Men's Wear", price: 1899, discount: 15, stock: 85, description: "Flat-front formal trousers in stretch fabric for maximum comfort. Slim fit with tapered leg opening. Machine washable.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Levis 511 Slim Fit Jeans", category: "Men's Wear", price: 3499, discount: 20, stock: 90, description: "Iconic slim-fit jeans in authentic stretch denim. Sits below the waist with slim fit through thigh and leg. A wardrobe staple.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Jack & Jones Polo T-Shirt", category: "Men's Wear", price: 1299, discount: 25, stock: 110, description: "Classic polo t-shirt with ribbed collar and cuffs. Pique cotton fabric, regular fit. Available in multiple colours.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Wrogn Graphic Oversized Tee", category: "Men's Wear", price: 899, discount: 30, stock: 130, description: "Trendy oversized graphic tee with bold print. Boxy silhouette and dropped shoulders. 100% cotton for everyday comfort.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Roadster Slim Fit Cargo", category: "Men's Wear", price: 1799, discount: 20, stock: 75, description: "Modern slim-fit cargo pants with multiple pockets and tapered leg. Stretch cotton blend for freedom of movement.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "U.S. Polo Assn. Striped Shirt", category: "Men's Wear", price: 1799, discount: 15, stock: 95, description: "Classic horizontal-striped shirt in soft cotton. Regular fit with single chest pocket. Effortless style for weekends.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Highlander Denim Jacket", category: "Men's Wear", price: 2499, discount: 20, stock: 60, description: "Vintage-wash denim jacket with button-front closure and chest pockets. Classic style that never goes out of fashion.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "HRX Jogger Pants", category: "Men's Wear", price: 1199, discount: 25, stock: 100, description: "Comfortable jogger pants with elastic waistband and drawstring. Tapered fit with ribbed cuffs. Ideal for workouts and lounging.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "SELECTED Homme Slim Suit", category: "Men's Wear", price: 8999, discount: 10, stock: 30, description: "Sharp slim-fit two-piece suit in micro-check pattern. Fully lined, with flat-front trousers. Ideal for weddings and formal events.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Celio Linen Shirt", category: "Men's Wear", price: 1699, discount: 20, stock: 70, description: "Breathable pure linen shirt with band collar and regular fit. Perfect for summer occasions and beach vacations.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Pepe Jeans Relaxed Fit Jeans", category: "Men's Wear", price: 2799, discount: 15, stock: 80, description: "Classic relaxed-fit denim jeans with a comfortable waist and roomy leg. Authentic five-pocket styling. Durable and long-lasting.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Turtle Textured Polo", category: "Men's Wear", price: 1499, discount: 20, stock: 90, description: "Premium textured polo shirt with contrast tipping on collar and cuffs. Slim fit, perfect for smart-casual occasions.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Flying Machine Hooded Sweatshirt", category: "Men's Wear", price: 1999, discount: 25, stock: 85, description: "Casual hooded sweatshirt with kangaroo pocket and ribbed cuffs. Fleece-lined interior for warmth and comfort.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Breakbounce Slim Chino", category: "Men's Wear", price: 1599, discount: 15, stock: 75, description: "Modern slim-fit chino in brushed cotton twill. Clean, minimal design that works for both casual and office wear.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Mufti Printed Casual Shirt", category: "Men's Wear", price: 1299, discount: 20, stock: 95, description: "Vibrant all-over print casual shirt with spread collar. Slim fit in lightweight fabric. Great for weekend outings.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Spykar Slim Tapered Jeans", category: "Men's Wear", price: 2199, discount: 20, stock: 70, description: "Contemporary slim-tapered jeans with slight ankle crop. Whisker and fading details for an authentic denim look.", photos: ["Men's Wear", "Men's Wear"] },
  { name: "Raymond Formal Shirt White", category: "Men's Wear", price: 1799, discount: 10, stock: 100, description: "Crisp white formal shirt in fine cotton poplin. Slim fit with spread collar. Ideal for office wear and formal occasions.", photos: ["Men's Wear", "Men's Wear"] },

  // ─── Kids' Wear (20) ───
  { name: "H&M Kids Printed Tee", category: "Kids' Wear", price: 499, discount: 20, stock: 150, description: "Fun printed t-shirt for kids in soft cotton jersey. Comfortable round neck and short sleeves. Easy care machine washable.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Mothercare Denim Dungaree", category: "Kids' Wear", price: 999, discount: 15, stock: 100, description: "Adorable denim dungaree with adjustable shoulder straps and snap buttons. Side pockets and embroidered patch detailing.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Lilliput Floral Dress", category: "Kids' Wear", price: 799, discount: 25, stock: 90, description: "Cute floral print dress for little girls. Smocked bodice with flutter sleeves and tiered skirt. Machine washable cotton.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Max Kids Hooded Jacket", category: "Kids' Wear", price: 1299, discount: 20, stock: 80, description: "Warm hooded jacket with zip-up closure. Soft fleece lining and two side pockets. Ideal for cool weather and outdoor activities.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Hopscotch Cotton Leggings", category: "Kids' Wear", price: 399, discount: 30, stock: 200, description: "Stretchy cotton leggings with elastic waistband. Super comfortable for active kids. Available in vibrant solid colours.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "612 League Cargo Shorts", category: "Kids' Wear", price: 699, discount: 20, stock: 120, description: "Practical cargo shorts with multiple pockets and elastic waistband. Durable cotton blend ideal for outdoor play.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Little Tag Full Sleeve Tee", category: "Kids' Wear", price: 449, discount: 25, stock: 160, description: "Soft full-sleeve t-shirt with fun character print on front. 100% cotton jersey, gentle on sensitive skin.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Chicco Baby Romper Set", category: "Kids' Wear", price: 1199, discount: 15, stock: 75, description: "Adorable romper set for toddlers with snap buttons. Soft interlock cotton fabric, easy to dress on and off.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Beebay Ethnic Kurta Set", category: "Kids' Wear", price: 899, discount: 20, stock: 85, description: "Festive kurta and pyjama set for boys. Embroidered yoke and mandarin collar. Ideal for Diwali and family celebrations.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Peppermint Party Dress", category: "Kids' Wear", price: 1099, discount: 15, stock: 70, description: "Twirl-worthy party dress with embellished waist and tulle skirt. Soft satin top with comfortable lining for little princesses.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Allen Solly Junior Polo", category: "Kids' Wear", price: 699, discount: 20, stock: 130, description: "Classic pique polo shirt for kids with ribbed collar. Regular fit, easy to mix and match with any bottom.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Gini & Jony Bermuda Shorts", category: "Kids' Wear", price: 599, discount: 25, stock: 110, description: "Knee-length bermuda shorts in lightweight cotton. Elastic waistband and side pockets. Great for summer playdates.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Liliput Track Pants Set", category: "Kids' Wear", price: 799, discount: 20, stock: 100, description: "Comfortable track pants and matching jacket set. Moisture-wicking fabric ideal for sports and outdoor activities.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "United Colors Striped Tee", category: "Kids' Wear", price: 549, discount: 15, stock: 140, description: "Colourful horizontal-striped tee in soft jersey cotton. Round neck, regular fit, perfect for everyday wear.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Pigeon Sleepsuit 3-Pack", category: "Kids' Wear", price: 1299, discount: 10, stock: 80, description: "Pack of 3 cozy sleepsuits in soft organic cotton. Snap buttons for easy diaper changes. Gentle on newborn skin.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Nauti Nati Embroidered Lehenga", category: "Kids' Wear", price: 1799, discount: 15, stock: 55, description: "Gorgeous embroidered lehenga choli set for special occasions. Festive colours with mirror work detailing.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Minikidz Denim Shorts", category: "Kids' Wear", price: 699, discount: 20, stock: 115, description: "Classic five-pocket denim shorts with frayed hem. Adjustable inner waistband for a perfect fit as kids grow.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Pspeaches Floral Kurti", category: "Kids' Wear", price: 649, discount: 25, stock: 95, description: "Sweet floral print kurti with contrast trim. A-line silhouette, comfortable cotton fabric for girls.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Naughty Ninos Superhero Tee", category: "Kids' Wear", price: 499, discount: 30, stock: 170, description: "Boys' superhero graphic tee with bold print. Soft cotton jersey, comfortable for all-day wear and play.", photos: ["Kids' Wear", "Kids' Wear"] },
  { name: "Zara Mini Trench Coat", category: "Kids' Wear", price: 2499, discount: 10, stock: 45, description: "Classic mini trench coat for kids in water-repellent fabric. Double-breasted with belt and back vent. Timeless style.", photos: ["Kids' Wear", "Kids' Wear"] },

  // ─── Ethnic Wear (20) ───
  { name: "Fabindia Block Print Kurta", category: "Ethnic Wear", price: 1899, discount: 20, stock: 80, description: "Hand block-printed cotton kurta with Mandarin collar. Artisanal craftsmanship from Rajasthan. Pairs with churidars or palazzos.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "W Festive Anarkali Suit", category: "Ethnic Wear", price: 3499, discount: 15, stock: 55, description: "Gorgeous Anarkali suit set with embroidered kurta, churidar and dupatta. Perfect for weddings and festive celebrations.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Biba Embroidered Salwar Set", category: "Ethnic Wear", price: 2799, discount: 20, stock: 65, description: "Elegant salwar kameez set with intricate thread embroidery. Comes with matching dupatta in flowing chiffon fabric.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Manyavar Sherwani Set", category: "Ethnic Wear", price: 12999, discount: 10, stock: 25, description: "Classic sherwani with intricate embroidery, comes with matching churidar. Perfect for grooms and wedding guests.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Global Desi Sharara Set", category: "Ethnic Wear", price: 2999, discount: 25, stock: 50, description: "Flared sharara set with embroidered yoke and matching dupatta. Comfortable and stylish for festive occasions.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Rajubhai Ahir Bandhani Suit", category: "Ethnic Wear", price: 2499, discount: 15, stock: 45, description: "Traditional Bandhani tie-dye suit from Gujarat. Natural dyes, cotton fabric, pair with chunni included.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Soch Georgette Kurta", category: "Ethnic Wear", price: 1799, discount: 30, stock: 70, description: "Semi-formal georgette kurta with sequin embellishments. Straight fit with side slits, pairs with palazzos or leggings.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Sangria Embroidered Kurta Set", category: "Ethnic Wear", price: 2299, discount: 20, stock: 60, description: "Cotton blend kurta set with intricate embroidered hem and neckline. Comfortable flared fit, ideal for all-day wear.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Inddus Chaniya Choli Set", category: "Ethnic Wear", price: 3999, discount: 20, stock: 35, description: "Vibrant Chaniya Choli set with heavy embroidery. Perfect for Navratri and Garba celebrations. Includes dupatta.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Anouk Printed Dhoti Pant Set", category: "Ethnic Wear", price: 1999, discount: 25, stock: 75, description: "Comfortable dhoti pant set with printed tunic top. Contemporary fusion ethnic look for festive occasions.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Aza Jewels Georgette Kurta", category: "Ethnic Wear", price: 2899, discount: 15, stock: 50, description: "Designer georgette kurta with hand-crafted zardosi embroidery. Elegant for parties and social gatherings.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Handloom Khadi Kurta Men", category: "Ethnic Wear", price: 1499, discount: 10, stock: 90, description: "Authentic handloom khadi kurta for men. Breathable, sustainable fabric with mandarin collar and side pockets.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Pothys Half Saree Set", category: "Ethnic Wear", price: 4999, discount: 10, stock: 30, description: "Traditional half saree set with embroidered pavadai, blouse and dupatta. Perfect for young girls during festivals.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Mochi Mojari Juttis", category: "Ethnic Wear", price: 1299, discount: 20, stock: 80, description: "Hand-crafted leather juttis (mojaris) with intricate embroidery. Traditional Punjabi footwear to complete ethnic outfits.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Meena Bazaar Jacket Kurta", category: "Ethnic Wear", price: 2699, discount: 20, stock: 55, description: "Printed kurta with detachable jacket overlay. Festive look with minimal effort. Comes with matching churidar.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Libas Pathani Suit", category: "Ethnic Wear", price: 1899, discount: 25, stock: 65, description: "Classic Pathani suit for men with traditional embroidery. Comfortable cotton fabric, perfect for Eid and celebrations.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "IMARA Straight Kurta Set", category: "Ethnic Wear", price: 2199, discount: 20, stock: 70, description: "Modern straight kurta set with digital print and coordinating palazzo. Festive yet contemporary styling.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Rangmanch by Pantaloons Lehenga", category: "Ethnic Wear", price: 5999, discount: 15, stock: 30, description: "Stunning lehenga choli with detailed embroidery and flared skirt. Complete set with matching blouse and dupatta.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Saree.com Printed Kalamkari Kurta", category: "Ethnic Wear", price: 1599, discount: 20, stock: 75, description: "Kalamkari art print kurta in pure cotton. Traditional South Indian folk art motifs on a comfortable straight fit.", photos: ["Ethnic Wear", "Ethnic Wear"] },
  { name: "Fabseasons Nehru Jacket", category: "Ethnic Wear", price: 1799, discount: 15, stock: 60, description: "Classic Nehru jacket in brocade fabric. Perfect layer over kurta for a polished ethnic look at weddings.", photos: ["Ethnic Wear", "Ethnic Wear"] },

  // ─── Western Wear (20) ───
  { name: "Levis 501 Original Jeans", category: "Western Wear", price: 3999, discount: 15, stock: 100, description: "The original, iconic straight-leg jeans. Button fly, sits at the waist with a straight fit through hip and leg. A true classic.", photos: ["Western Wear", "Western Wear"] },
  { name: "Zara Tailored Blazer", category: "Western Wear", price: 4999, discount: 20, stock: 45, description: "Contemporary tailored blazer in a relaxed fit. Single button closure, patch pockets. Can be dressed up or down effortlessly.", photos: ["Western Wear", "Western Wear"] },
  { name: "H&M Flared Trousers", category: "Western Wear", price: 1999, discount: 25, stock: 75, description: "High-waisted flared trousers in a soft fabric blend. Comfortable fit with elastic back waist and wide flare from knee.", photos: ["Western Wear", "Western Wear"] },
  { name: "Mango Ripped Skinny Jeans", category: "Western Wear", price: 2999, discount: 20, stock: 80, description: "Classic skinny jeans with ripped knee detail. High-rise waist, five-pocket styling. Stretch denim for all-day comfort.", photos: ["Western Wear", "Western Wear"] },
  { name: "Topshop Corset Top", category: "Western Wear", price: 1999, discount: 30, stock: 60, description: "Trendy boning corset top with lace-up back detail. Structured silhouette pairs perfectly with wide-leg trousers or jeans.", photos: ["Western Wear", "Western Wear"] },
  { name: "Gap Boyfriend Shirt", category: "Western Wear", price: 2499, discount: 20, stock: 85, description: "Oversized boyfriend-cut shirt in soft cotton poplin. Relaxed fit, long length, wear open or tucked in. Versatile wardrobe staple.", photos: ["Western Wear", "Western Wear"] },
  { name: "Only Mini Skirt Denim", category: "Western Wear", price: 1799, discount: 15, stock: 70, description: "Classic denim mini skirt with five-pocket styling. Button fly, comfortable stretch denim. A summer essential.", photos: ["Western Wear", "Western Wear"] },
  { name: "Vero Moda Pleated Midi Skirt", category: "Western Wear", price: 2299, discount: 25, stock: 55, description: "Elegant pleated midi skirt in satin finish. Elasticated waist with front split. Perfect for smart-casual occasions.", photos: ["Western Wear", "Western Wear"] },
  { name: "Wrogn Oversized Hoodie", category: "Western Wear", price: 1999, discount: 20, stock: 100, description: "Relaxed oversized hoodie with kangaroo pocket and drawstring hood. Fleece-lined for cozy comfort on cool days.", photos: ["Western Wear", "Western Wear"] },
  { name: "FabAlley Tie-Dye Co-Ord Set", category: "Western Wear", price: 2799, discount: 15, stock: 50, description: "Trendy tie-dye crop top and high-waisted shorts co-ord set. Fun colours, comfortable jersey fabric for weekends.", photos: ["Western Wear", "Western Wear"] },
  { name: "Forever 21 Ruched Bodycon Dress", category: "Western Wear", price: 1999, discount: 30, stock: 65, description: "Flattering ruched bodycon dress in stretchy jersey. Off-shoulder neckline and midi length for a chic evening look.", photos: ["Western Wear", "Western Wear"] },
  { name: "AND Wrap Jumpsuit", category: "Western Wear", price: 2499, discount: 20, stock: 55, description: "Stylish wrap-front jumpsuit with V-neckline and wide leg. Fluid fabric drapes beautifully for effortless dressing.", photos: ["Western Wear", "Western Wear"] },
  { name: "Roadster Mom Fit Jeans", category: "Western Wear", price: 2199, discount: 15, stock: 90, description: "Relaxed mom-fit jeans with high waist and tapered leg. Classic five-pocket styling in rigid denim for that retro look.", photos: ["Western Wear", "Western Wear"] },
  { name: "Jack & Jones Cargo Joggers", category: "Western Wear", price: 2499, discount: 20, stock: 80, description: "Hybrid cargo joggers combining utility pockets with comfortable jogger fit. Tapered leg with ribbed cuffs.", photos: ["Western Wear", "Western Wear"] },
  { name: "Nautica Polo Dress", category: "Western Wear", price: 2999, discount: 10, stock: 45, description: "Classic polo shirt dress with logo embroidery. Button placket, A-line fit, thigh-length hem. Casual and chic.", photos: ["Western Wear", "Western Wear"] },
  { name: "Bossini Graphic Tee", category: "Western Wear", price: 799, discount: 35, stock: 120, description: "Casual graphic tee with bold front print. Relaxed fit in 100% cotton jersey. Effortless street-style look.", photos: ["Western Wear", "Western Wear"] },
  { name: "Mufti Slim Chino Shorts", category: "Western Wear", price: 1499, discount: 20, stock: 85, description: "Slim-fit chino shorts with button fly and two side pockets. Stretch cotton for comfortable all-day wear.", photos: ["Western Wear", "Western Wear"] },
  { name: "Spykar Straight Denim Skirt", category: "Western Wear", price: 1899, discount: 15, stock: 60, description: "Below-knee straight denim skirt with front button placket. Classic washed look, pairs with tops or shirts.", photos: ["Western Wear", "Western Wear"] },
  { name: "Kappa Track Jacket", category: "Western Wear", price: 3499, discount: 20, stock: 50, description: "Retro-inspired track jacket with Omini logo taping. Zip-up closure with side pockets. 70s sportswear aesthetic.", photos: ["Western Wear", "Western Wear"] },
  { name: "Reebok Classic Windbreaker", category: "Western Wear", price: 4499, discount: 15, stock: 40, description: "Lightweight windbreaker in nylon with zip pockets. Classic Reebok branding. Great for transitional weather and workouts.", photos: ["Western Wear", "Western Wear"] },

  // ─── Footwear (20) ───
  { name: "Nike Air Force 1 White", category: "Footwear", price: 7999, discount: 10, stock: 60, description: "The iconic Air Force 1 in all-white leather. Low-top profile with Air-Sole unit for cushioning. A timeless sneaker for everyday wear.", photos: ["Footwear", "Footwear"] },
  { name: "Adidas Stan Smith Green", category: "Footwear", price: 6999, discount: 15, stock: 55, description: "Classic tennis-inspired sneaker in perforated leather upper. Signature Stan Smith three stripes on side. Clean, minimal look.", photos: ["Footwear", "Footwear"] },
  { name: "Puma RS-X Bold Sneakers", category: "Footwear", price: 8499, discount: 20, stock: 45, description: "Chunky retro-inspired sneakers with RS running system cushioning. Multi-coloured design, rubber outsole for durability.", photos: ["Footwear", "Footwear"] },
  { name: "Red Tape Oxford Shoes", category: "Footwear", price: 3499, discount: 15, stock: 70, description: "Premium leather Oxford shoes with lace-up closure and brogue detailing. Cushioned footbed for all-day comfort.", photos: ["Footwear", "Footwear"] },
  { name: "Metro Block Heel Pumps", category: "Footwear", price: 2499, discount: 20, stock: 65, description: "Classic block heel pumps in patent leather. Pointed toe, 3-inch heel. Elevate any outfit from office to evenings.", photos: ["Footwear", "Footwear"] },
  { name: "Clarks Desert Boot", category: "Footwear", price: 5999, discount: 10, stock: 50, description: "Iconic two-eyelet desert boot in suede. Lightweight crepe sole, minimal and versatile design. A wardrobe essential.", photos: ["Footwear", "Footwear"] },
  { name: "Bata Flat Sandals Women", category: "Footwear", price: 999, discount: 25, stock: 100, description: "Comfortable flat sandals with adjustable ankle strap. Cushioned footbed with non-slip sole. Perfect for daily use.", photos: ["Footwear", "Footwear"] },
  { name: "Woodland Leather Loafers", category: "Footwear", price: 3999, discount: 20, stock: 60, description: "Genuine leather moccasin loafers with penny detail. Leather lining and cushioned insole. Versatile for casual and semi-formal wear.", photos: ["Footwear", "Footwear"] },
  { name: "Catwalk Wedge Heels", category: "Footwear", price: 1899, discount: 30, stock: 75, description: "Stylish wedge heel sandals with ankle strap and buckle closure. 4-inch wedge for added height and comfort.", photos: ["Footwear", "Footwear"] },
  { name: "Converse Chuck Taylor High Top", category: "Footwear", price: 4999, discount: 10, stock: 80, description: "Legendary hi-top canvas sneakers with rubber toe cap. Classic lace-up with iconic Converse star logo. Never goes out of style.", photos: ["Footwear", "Footwear"] },
  { name: "Liberty Chelsea Boots", category: "Footwear", price: 3299, discount: 15, stock: 55, description: "Classic ankle Chelsea boots with elastic side panels. Leather upper with block heel. Suits both casual and formal outfits.", photos: ["Footwear", "Footwear"] },
  { name: "Khadim's Kolhapuri Chappals", category: "Footwear", price: 699, discount: 20, stock: 120, description: "Traditional Kolhapuri chappals in genuine leather with handcrafted kolhapuri stitching. Durable and comfortable for daily wear.", photos: ["Footwear", "Footwear"] },
  { name: "Skechers Go Walk Slip-Ons", category: "Footwear", price: 3999, discount: 15, stock: 85, description: "Ultra-lightweight slip-on walking shoes with Goga Mat insole. Flexible sole and breathable mesh upper for all-day comfort.", photos: ["Footwear", "Footwear"] },
  { name: "Inc.5 Kitten Heel Mules", category: "Footwear", price: 1799, discount: 25, stock: 70, description: "Elegant kitten heel mules with open square toe. Faux leather upper, lightweight and comfortable for work wear.", photos: ["Footwear", "Footwear"] },
  { name: "Vans Old Skool Black/White", category: "Footwear", price: 4999, discount: 10, stock: 75, description: "Classic skate shoes with side stripe detailing. Canvas and suede upper with vulcanised sole. Iconic skate-inspired style.", photos: ["Footwear", "Footwear"] },
  { name: "Hush Puppies Derby Shoes", category: "Footwear", price: 4499, discount: 15, stock: 50, description: "Classic lace-up derby shoes in premium leather. Comfortable padded collar and cushioned footbed. Versatile for formal occasions.", photos: ["Footwear", "Footwear"] },
  { name: "Fitflop Ergonomic Sandals", category: "Footwear", price: 4999, discount: 10, stock: 45, description: "Ergonomically designed sandals with biomechanically engineered footbed. Reduces strain on joints while walking. Stylish too.", photos: ["Footwear", "Footwear"] },
  { name: "Puma Smash Platform Sneakers", category: "Footwear", price: 5999, discount: 20, stock: 55, description: "Platform sneakers with chunky sole and lace-up closure. Leather upper with Puma formstrip detail. Fashion-forward and comfortable.", photos: ["Footwear", "Footwear"] },
  { name: "Aldo Strappy Heeled Sandals", category: "Footwear", price: 3999, discount: 25, stock: 40, description: "Delicate strappy sandals with stiletto heel. Open toe with ankle strap for secure fit. Perfect for parties and events.", photos: ["Footwear", "Footwear"] },
  { name: "Campus Ultralight Running Shoes", category: "Footwear", price: 1999, discount: 25, stock: 100, description: "Lightweight mesh running shoes with cushioned midsole and non-slip rubber outsole. Great for jogging and daily walks.", photos: ["Footwear", "Footwear"] },

  // ─── Accessories (20) ───
  { name: "Titan Kairos Automatic Watch", category: "Accessories", price: 12999, discount: 10, stock: 30, description: "Elegant automatic watch with exhibition case back. Stainless steel case, leather strap, date display. Water resistant to 50m.", photos: ["Accessories", "Accessories"] },
  { name: "Ray-Ban Aviator Sunglasses", category: "Accessories", price: 6999, discount: 15, stock: 45, description: "Classic metal-frame Aviator sunglasses with UV400 protection. Iconic teardrop lenses in polarized glass. A timeless accessory.", photos: ["Accessories", "Accessories"] },
  { name: "Fastrack Chronograph Watch", category: "Accessories", price: 3499, discount: 20, stock: 55, description: "Sporty chronograph watch with multi-function display. Stainless steel bracelet, mineral glass crystal, 100m water resistance.", photos: ["Accessories", "Accessories"] },
  { name: "Chokore Silk Pocket Square", category: "Accessories", price: 799, discount: 25, stock: 100, description: "Pure silk pocket square with paisley print. Adds a sophisticated touch to formal and semi-formal suits.", photos: ["Accessories", "Accessories"] },
  { name: "Fossil Quinn Minimalist Watch", category: "Accessories", price: 8999, discount: 10, stock: 35, description: "Slim minimalist watch in polished stainless steel. Three-hand movement, leather strap. Understated elegance for everyday wear.", photos: ["Accessories", "Accessories"] },
  { name: "Burberry Classic Check Scarf", category: "Accessories", price: 4999, discount: 15, stock: 40, description: "Soft wool-blend scarf in the iconic Burberry check. Generous size for versatile styling — wrap, drape or tie.", photos: ["Accessories", "Accessories"] },
  { name: "Carrera Wayfarers Sunglasses", category: "Accessories", price: 5499, discount: 20, stock: 50, description: "Bold Wayfarer frames with polarised lenses and UV400 protection. Acetate frame in classic tortoise finish.", photos: ["Accessories", "Accessories"] },
  { name: "Tommy Hilfiger Belt Men", category: "Accessories", price: 2999, discount: 15, stock: 60, description: "Classic leather belt with gold-tone Tommy Hilfiger logo buckle. 35mm width, perfect for formal and casual trousers.", photos: ["Accessories", "Accessories"] },
  { name: "FabSeasons Printed Stole", category: "Accessories", price: 599, discount: 30, stock: 120, description: "Light viscose stole with geometric print. Versatile accessory to wear as a scarf, shawl or wrap over ethnic and western outfits.", photos: ["Accessories", "Accessories"] },
  { name: "Wildcraft Tactical Wrist Band", category: "Accessories", price: 299, discount: 20, stock: 200, description: "Silicone sports wrist band with adjustable closure. Lightweight and durable, ideal for outdoor activities and workouts.", photos: ["Accessories", "Accessories"] },
  { name: "H&M Knit Beanie Hat", category: "Accessories", price: 699, discount: 25, stock: 90, description: "Soft ribbed knit beanie in warm wool blend. Snug fit for cold weather. Available in multiple solid colours.", photos: ["Accessories", "Accessories"] },
  { name: "Accessorize Scrunchie 3-Pack", category: "Accessories", price: 449, discount: 20, stock: 150, description: "Set of 3 fabric scrunchies in complementary prints. Gentle on hair, no damage. Great for ponytails and buns.", photos: ["Accessories", "Accessories"] },
  { name: "Fossil Men's Leather Card Holder", category: "Accessories", price: 2499, discount: 10, stock: 65, description: "Slim bifold card holder in genuine leather. Multiple card slots and centre note pocket. Minimal, modern and lightweight.", photos: ["Accessories", "Accessories"] },
  { name: "Casio G-Shock DW Series", category: "Accessories", price: 7499, discount: 10, stock: 40, description: "Legendary shock-resistant G-Shock watch. 200m water resistance, world time, multiple alarms. Built to survive anything.", photos: ["Accessories", "Accessories"] },
  { name: "Chanel No.5 Inspired Dupe Perfume", category: "Accessories", price: 1299, discount: 25, stock: 80, description: "Elegant floral-aldehyde fragrance inspired by classic French perfumery. Long-lasting EDT, 50ml bottle with spray.", photos: ["Accessories", "Accessories"] },
  { name: "Nike Cap Dri-FIT Adjustable", category: "Accessories", price: 1499, discount: 15, stock: 100, description: "Performance Dri-FIT cap with adjustable back strap. Moisture-wicking sweatband keeps you cool during workouts.", photos: ["Accessories", "Accessories"] },
  { name: "Lenskart Reading Glasses", category: "Accessories", price: 999, discount: 30, stock: 120, description: "Blue light blocking reading glasses in acetate frame. Lightweight and stylish, protects from digital eye strain.", photos: ["Accessories", "Accessories"] },
  { name: "Dapper Lapel Pin Set", category: "Accessories", price: 899, discount: 20, stock: 80, description: "Set of 5 enamel lapel pins in assorted designs. Add personality to blazers, bags and jackets.", photos: ["Accessories", "Accessories"] },
  { name: "Steve Madden Women's Belt", category: "Accessories", price: 2299, discount: 15, stock: 55, description: "Trendy wide belt in faux leather with square gold-tone buckle. Cinch dresses and oversized tops at the waist.", photos: ["Accessories", "Accessories"] },
  { name: "Michael Kors Inspired Bracelet Set", category: "Accessories", price: 1299, discount: 20, stock: 70, description: "Stack bracelet set with gold-tone bangles and charm detail. Modern arm candy for daily wear and special occasions.", photos: ["Accessories", "Accessories"] },

  // ─── Bags & Handbags (20) ───
  { name: "Baggit Structured Tote Bag", category: "Bags & Handbags", price: 2999, discount: 20, stock: 60, description: "Structured tote bag in vegan leather with dual handles and zip top closure. Internal zip pocket and card slots.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Caprese Zip-Around Wallet", category: "Bags & Handbags", price: 1999, discount: 15, stock: 80, description: "Spacious zip-around wallet in premium PU leather. Multiple card slots, coin pocket and note compartment. Compact yet functional.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Hidesign Leather Sling Bag", category: "Bags & Handbags", price: 4999, discount: 10, stock: 40, description: "Hand-crafted genuine leather sling bag with adjustable strap. Zip main compartment with front slip pocket. Vintage aesthetic.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Lavie Quilted Chain Bag", category: "Bags & Handbags", price: 2799, discount: 20, stock: 55, description: "Chic quilted bag with gold chain strap. Zip top closure with internal organiser pockets. Elegant for evenings and events.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Esbeda Croc-Embossed Handbag", category: "Bags & Handbags", price: 3499, discount: 25, stock: 45, description: "Structured handbag in croc-embossed PU leather. Twin handles plus detachable shoulder strap. Multiple pockets for organisation.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Lino Perros Canvas Shopper", category: "Bags & Handbags", price: 1299, discount: 20, stock: 90, description: "Casual canvas shopper bag with internal zip pocket. Sturdy handles and a lightweight design. Great for daily use.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Toteteca Graphic Backpack", category: "Bags & Handbags", price: 1799, discount: 15, stock: 75, description: "Fun graphic print backpack with padded laptop compartment. Multiple pockets and adjustable straps for comfortable carry.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Da Milano Leather Clutch", category: "Bags & Handbags", price: 3999, discount: 15, stock: 35, description: "Sleek leather clutch with magnetic snap closure. Card slots inside for minimalist essentials. Perfect for parties.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Puma Phase Small Backpack", category: "Bags & Handbags", price: 1999, discount: 20, stock: 85, description: "Compact backpack with padded back panel and two main compartments. Iconic Puma formstrip on front. Great for school and travel.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Guess Status Crossbody Bag", category: "Bags & Handbags", price: 5999, discount: 15, stock: 30, description: "Iconic Guess logo crossbody bag in faux leather. Adjustable chain strap, zip closure and interior zip pocket.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Wildcraft Rucksack 30L", category: "Bags & Handbags", price: 2999, discount: 20, stock: 50, description: "Rugged 30L rucksack with multiple compartments and padded shoulder straps. Rain cover included. Ideal for trekking and travel.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Accessorize Beaded Clutch", category: "Bags & Handbags", price: 1499, discount: 30, stock: 60, description: "Handcrafted beaded clutch in floral motif. Foldover magnetic closure with wrist loop. Makes a statement at parties.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Miraggio Geometric Satchel", category: "Bags & Handbags", price: 2499, discount: 20, stock: 50, description: "Structured satchel with geometric quilted pattern. Top handle and detachable crossbody strap. Polished gold hardware.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Fastrack Women Zip Pouch", category: "Bags & Handbags", price: 999, discount: 25, stock: 100, description: "Compact zip pouch for makeup and essentials. Water-resistant lining, dual zip closure. Fits in any handbag.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Hammonds Flycatcher Laptop Bag", category: "Bags & Handbags", price: 3499, discount: 15, stock: 40, description: "Premium messenger laptop bag in genuine leather. Fits 15.6\" laptops. Multiple pockets and adjustable shoulder strap.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "House of Quirk Jute Tote", category: "Bags & Handbags", price: 699, discount: 20, stock: 150, description: "Eco-friendly jute tote with printed canvas base and side pockets. Sturdy handles for everyday shopping and errands.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Pepe Jeans Mini Backpack", category: "Bags & Handbags", price: 2499, discount: 20, stock: 60, description: "Trendy mini backpack in faux leather with top zip closure. Adjustable straps, internal pocket. Fashion and function.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Aldo Suede Shoulder Bag", category: "Bags & Handbags", price: 5499, discount: 15, stock: 35, description: "Soft suede shoulder bag with gathered drawstring closure. Slip pocket and metal ring hardware. Luxe everyday carry.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Tommy Hilfiger Monogram Duffle", category: "Bags & Handbags", price: 6999, discount: 10, stock: 25, description: "Classic monogram canvas duffle bag with leather trim. Spacious main compartment and shoe pocket. Travel-ready style.", photos: ["Bags & Handbags", "Bags & Handbags"] },
  { name: "Styli Bucket Bag", category: "Bags & Handbags", price: 1799, discount: 25, stock: 70, description: "Trendy bucket bag with cinch drawstring closure and shoulder strap. Roomy interior with internal pocket. Very on trend.", photos: ["Bags & Handbags", "Bags & Handbags"] },

  // ─── Jewellery (20) ───
  { name: "Mia by Tanishq Diamond Pendant", category: "Jewellery", price: 12999, discount: 10, stock: 25, description: "Delicate 14K white gold pendant with diamond solitaire. Hallmarked BIS 14K gold, certificate of authenticity included.", photos: ["Jewellery", "Jewellery"] },
  { name: "Tanishq Gold Earrings", category: "Jewellery", price: 8999, discount: 5, stock: 30, description: "Classic 22K gold stud earrings with floral design. Hallmarked gold with BIS certification. Timeless everyday jewellery.", photos: ["Jewellery", "Jewellery"] },
  { name: "Zaveri Pearls Kundan Necklace", category: "Jewellery", price: 1999, discount: 25, stock: 60, description: "Statement kundan necklace set with matching earrings and maangtikka. Perfect for weddings and festive occasions.", photos: ["Jewellery", "Jewellery"] },
  { name: "PC Jeweller Silver Bracelet", category: "Jewellery", price: 3499, discount: 15, stock: 45, description: "925 sterling silver bracelet with box chain design. Adjustable clasp, lightweight and comfortable for daily wear.", photos: ["Jewellery", "Jewellery"] },
  { name: "Voylla Oxidised Jhumkas", category: "Jewellery", price: 899, discount: 30, stock: 100, description: "Boho-style oxidised silver jhumka earrings with floral top and bead detailing. Hypoallergenic, perfect for ethnic wear.", photos: ["Jewellery", "Jewellery"] },
  { name: "BlueStone Ruby Pendant Set", category: "Jewellery", price: 7999, discount: 10, stock: 20, description: "18K gold pendant set with natural ruby and diamond accents. Gift box included. Certificate of authenticity.", photos: ["Jewellery", "Jewellery"] },
  { name: "Sukkhi Bangle Set 4-Pcs", category: "Jewellery", price: 1299, discount: 20, stock: 80, description: "Set of 4 gold-plated bangles with intricate filigree design. Nickel-free, ideal for everyday and festive wear.", photos: ["Jewellery", "Jewellery"] },
  { name: "Pipa Bella Geometric Rings Set", category: "Jewellery", price: 799, discount: 25, stock: 110, description: "Stackable geometric rings set of 5 in gold and silver plating. Contemporary minimalist design for everyday styling.", photos: ["Jewellery", "Jewellery"] },
  { name: "Caratlane Diamond Nose Pin", category: "Jewellery", price: 4999, discount: 10, stock: 35, description: "14K gold nose pin with round brilliant diamond. Classic and subtle, suitable for both traditional and modern looks.", photos: ["Jewellery", "Jewellery"] },
  { name: "Meenakari Peacock Earrings", category: "Jewellery", price: 1599, discount: 20, stock: 65, description: "Handcrafted Meenakari peacock jhumka earrings with vibrant enamel work. Traditional Jaipur art form at its finest.", photos: ["Jewellery", "Jewellery"] },
  { name: "Accessorize Crystal Headband", category: "Jewellery", price: 1299, discount: 15, stock: 70, description: "Sparkling crystal headband with pavé-set rhinestones. Perfect hair accessory for parties, proms and special occasions.", photos: ["Jewellery", "Jewellery"] },
  { name: "Tribe by Amrapali Boho Ring", category: "Jewellery", price: 2499, discount: 20, stock: 50, description: "Bold boho-inspired ring in silver with turquoise stone inlay. Statement piece from the artisanal Tribe collection.", photos: ["Jewellery", "Jewellery"] },
  { name: "Giva Silver Infinity Necklace", category: "Jewellery", price: 1999, discount: 15, stock: 75, description: "Elegant 925 sterling silver infinity symbol necklace. Dainty chain with polished pendant. A thoughtful gift.", photos: ["Jewellery", "Jewellery"] },
  { name: "Beadworks Seed Bead Bracelet", category: "Jewellery", price: 499, discount: 30, stock: 150, description: "Handmade seed bead stretch bracelet in multi-colour. Lightweight and versatile, layers well with other bracelets.", photos: ["Jewellery", "Jewellery"] },
  { name: "Vasantha Pearl Choker", category: "Jewellery", price: 3499, discount: 15, stock: 40, description: "Classic pearl choker necklace with 8mm South Sea pearls on elastic cord. Bridal and festive wear essential.", photos: ["Jewellery", "Jewellery"] },
  { name: "Amazon Brand Hoop Earrings", category: "Jewellery", price: 699, discount: 20, stock: 120, description: "Classic gold-plated hoop earrings in 20mm size. Hypoallergenic, lightweight and versatile for every look.", photos: ["Jewellery", "Jewellery"] },
  { name: "Ritika Singh Payal Anklet", category: "Jewellery", price: 1199, discount: 20, stock: 85, description: "Silver-plated anklet with tinkling ghungroos. Adjustable lobster clasp, delicate chain with charm detail.", photos: ["Jewellery", "Jewellery"] },
  { name: "Lush & Beyond Statement Cuff", category: "Jewellery", price: 1499, discount: 25, stock: 60, description: "Bold statement cuff bracelet in hammered brass with gold finish. Adjustable opening fits most wrist sizes.", photos: ["Jewellery", "Jewellery"] },
  { name: "Dazzling Diva Hair Clip Set", category: "Jewellery", price: 899, discount: 20, stock: 95, description: "Set of 6 pearl and gem hair clips for elegant updos. Secure clasp keeps hair in place all day.", photos: ["Jewellery", "Jewellery"] },
  { name: "Caratlane Men's ID Bracelet", category: "Jewellery", price: 5999, discount: 10, stock: 30, description: "Sleek 925 sterling silver ID bracelet for men. Engraving available, polished links with box clasp.", photos: ["Jewellery", "Jewellery"] },

  // ─── Activewear (20) ───
  { name: "Nike Dri-FIT Running Tee", category: "Activewear", price: 1999, discount: 20, stock: 100, description: "Lightweight Dri-FIT t-shirt that wicks sweat to keep you dry. Ergonomic seams and slim fit for unrestricted movement.", photos: ["Activewear", "Activewear"] },
  { name: "Adidas Tiro 21 Track Pants", category: "Activewear", price: 2499, discount: 15, stock: 80, description: "Classic Tiro track pants with tapered fit and zip ankles. Moisture-wicking Aeroready fabric for on-pitch and gym training.", photos: ["Activewear", "Activewear"] },
  { name: "Reebok Speed Shorts", category: "Activewear", price: 1799, discount: 20, stock: 90, description: "Lightweight running shorts with built-in liner and reflective details. Zippered back pocket for essentials.", photos: ["Activewear", "Activewear"] },
  { name: "Puma Train Vent Sports Bra", category: "Activewear", price: 2299, discount: 15, stock: 75, description: "Medium support sports bra with ventilation panels. Removable cups, racerback design. Moisture-wicking, quick-dry fabric.", photos: ["Activewear", "Activewear"] },
  { name: "HRX Compression Tights", category: "Activewear", price: 1499, discount: 25, stock: 85, description: "Full-length compression tights with moisture management. Four-way stretch fabric supports muscles during intense workouts.", photos: ["Activewear", "Activewear"] },
  { name: "Under Armour Tech Polo", category: "Activewear", price: 2999, discount: 10, stock: 55, description: "Performance polo with UA Tech fabric that feels amazingly soft. Anti-odour technology and 4-way stretch for golf and sports.", photos: ["Activewear", "Activewear"] },
  { name: "Decathlon Kalenji Running Jacket", category: "Activewear", price: 1999, discount: 20, stock: 65, description: "Lightweight windproof running jacket with packable design. Reflective details for visibility. Zipped pockets for storage.", photos: ["Activewear", "Activewear"] },
  { name: "Speedo Endurance Swimsuit", category: "Activewear", price: 3499, discount: 15, stock: 40, description: "Chlorine-resistant competitive swimsuit in Endurance+ fabric. Racerback design, UV50+ protection. For serious swimmers.", photos: ["Activewear", "Activewear"] },
  { name: "Wildcraft Quick-Dry T-Shirt", category: "Activewear", price: 1299, discount: 20, stock: 90, description: "Quick-dry t-shirt with UPF 40 sun protection. Lightweight mesh-like fabric keeps you cool on hikes and outdoor activities.", photos: ["Activewear", "Activewear"] },
  { name: "Jockey Active Bra", category: "Activewear", price: 999, discount: 15, stock: 120, description: "Medium impact sports bra with breathable mesh panels. Racerback design with wider straps for full support during workouts.", photos: ["Activewear", "Activewear"] },
  { name: "ASICS Gel Training Shorts", category: "Activewear", price: 2199, discount: 15, stock: 70, description: "Lightweight training shorts with side split for mobility. Inner brief with drawstring waist. Side zip pocket.", photos: ["Activewear", "Activewear"] },
  { name: "2XU Compression Calf Sleeves", category: "Activewear", price: 2499, discount: 20, stock: 55, description: "Graduated compression calf sleeves for improved circulation during runs. Reduces muscle vibration and aids recovery.", photos: ["Activewear", "Activewear"] },
  { name: "Nivia Gym Gloves", category: "Activewear", price: 699, discount: 25, stock: 150, description: "Breathable gym training gloves with padded palm and wrist support. Non-slip grip for heavy lifting and gym machines.", photos: ["Activewear", "Activewear"] },
  { name: "Maxx-Dri Silver Performance Tee", category: "Activewear", price: 1799, discount: 15, stock: 85, description: "Antimicrobial silver-ion performance tee for intense training. Moisture wicking, odour control, super lightweight fabric.", photos: ["Activewear", "Activewear"] },
  { name: "Flex Fit Yoga Pants", category: "Activewear", price: 1599, discount: 20, stock: 95, description: "High-waist yoga pants with tummy control panel. Four-way stretch fabric, squat-proof and super comfortable for yoga.", photos: ["Activewear", "Activewear"] },
  { name: "Cultsport Sleeveless Gym Vest", category: "Activewear", price: 799, discount: 30, stock: 130, description: "Racerback training vest in moisture-wicking fabric. Deep armhole for full range of motion. Perfect for gym and outdoor sports.", photos: ["Activewear", "Activewear"] },
  { name: "TYR Competitor Swim Brief", category: "Activewear", price: 1999, discount: 10, stock: 50, description: "Competitive swim brief in drag-reducing fabric. Drawstring waist, low-cut leg openings for unrestricted kick.", photos: ["Activewear", "Activewear"] },
  { name: "Nike Pro Combat Shorts", category: "Activewear", price: 2799, discount: 15, stock: 65, description: "Performance training shorts with compression liner. Moisture-wicking Dri-FIT fabric with side zip pocket.", photos: ["Activewear", "Activewear"] },
  { name: "Adidas Floorence Sports Bra", category: "Activewear", price: 2499, discount: 20, stock: 70, description: "High-support sports bra with padded cups and strappy back detail. Aeroready moisture-management for intense workouts.", photos: ["Activewear", "Activewear"] },
  { name: "Reebok CrossFit Nano Tee", category: "Activewear", price: 2199, discount: 15, stock: 75, description: "Durable CrossFit training t-shirt with reinforced seams. Speedwick moisture management for box training and functional fitness.", photos: ["Activewear", "Activewear"] },

  // ─── Innerwear & Sleepwear (20) ───
  { name: "Jockey Men's Trunk Pack of 3", category: "Innerwear & Sleepwear", price: 999, discount: 15, stock: 150, description: "Pack of 3 premium cotton trunks with no-ride-up construction. Soft waistband, breathable fabric for all-day comfort.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Marks & Spencer Lace Bra", category: "Innerwear & Sleepwear", price: 1499, discount: 20, stock: 90, description: "Floral lace non-padded bra with underwired cups. Adjustable straps and back closure. Comfortable everyday lingerie.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Shyaway Cotton Bikini Briefs 3-Pack", category: "Innerwear & Sleepwear", price: 699, discount: 25, stock: 120, description: "Pack of 3 comfortable cotton bikini briefs with elastic waistband. Breathable fabric for daily wear.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Enamor Full Coverage Bra", category: "Innerwear & Sleepwear", price: 1299, discount: 15, stock: 100, description: "Full-coverage T-shirt bra with moulded cups. Smooth finish under fitted tops. Adjustable straps and back hook.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Van Heusen Satin Pyjama Set", category: "Innerwear & Sleepwear", price: 1799, discount: 20, stock: 70, description: "Luxurious satin pyjama set with long-sleeve shirt and elastic waist pants. Floral print on soft silky fabric.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Clovia Padded Sports Bra", category: "Innerwear & Sleepwear", price: 899, discount: 20, stock: 110, description: "Removable padded sports bra with racerback design. Medium support, moisture-wicking fabric for yoga and casual gym.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Bamboo Rose Floral Nightgown", category: "Innerwear & Sleepwear", price: 1299, discount: 25, stock: 80, description: "Soft bamboo-blend nightgown with floral print and V-neckline. Lightweight, breathable, moisture-wicking for a good night's sleep.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Lux Cozi Thermal Vest", category: "Innerwear & Sleepwear", price: 499, discount: 15, stock: 150, description: "Warm thermal inner vest with ribbed knit texture. Traps body heat for insulation. Slim fit wears comfortably under any top.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Groversons Men's Boxers 2-Pack", category: "Innerwear & Sleepwear", price: 799, discount: 20, stock: 130, description: "Pack of 2 cotton woven boxers with check print. Comfortable elastic waistband and button fly.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Amante Plunge Push-Up Bra", category: "Innerwear & Sleepwear", price: 1499, discount: 15, stock: 85, description: "Plunge push-up bra with side-sling support. Creates flattering cleavage under deep-neck outfits. Lace trim detailing.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Dollar Biggboss Vest 3-Pack", category: "Innerwear & Sleepwear", price: 599, discount: 20, stock: 200, description: "Pack of 3 cotton inner vests in white. Ribbed texture, round neck, comfortable and breathable for daily wear.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "N-Gal Silk Nightsuit Set", category: "Innerwear & Sleepwear", price: 1999, discount: 20, stock: 60, description: "Elegant silk-feel nightsuit with button-down top and full-length pants. Printed border, lightweight for comfortable sleep.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Lavos Performance Boxers", category: "Innerwear & Sleepwear", price: 999, discount: 15, stock: 110, description: "Sustainable bamboo-cotton blend boxers. Naturally antibacterial and moisture-wicking. Soft waistband for all-day comfort.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Prettysecrets Printed Sleep Shorts", category: "Innerwear & Sleepwear", price: 799, discount: 25, stock: 90, description: "Fun printed lounge shorts in soft jersey cotton. Elastic waistband, relaxed fit — perfect for bedtime and lazy mornings.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Triumph T-Shirt Bra", category: "Innerwear & Sleepwear", price: 1799, discount: 10, stock: 70, description: "Seamless moulded cup T-shirt bra with no visible lines under tops. Breathable spacer fabric with adjustable straps.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Lovable Cotton Hipster Briefs", category: "Innerwear & Sleepwear", price: 399, discount: 20, stock: 160, description: "Comfortable cotton hipster briefs with lace waistband. Full seat coverage, soft elastics that don't dig in.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Nite Flite Couple Sleep Tee Set", category: "Innerwear & Sleepwear", price: 1599, discount: 20, stock: 55, description: "Matching couple sleep t-shirt set in soft cotton with printed slogan. Fun gifting option for couples.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Zivame Seamless Bralette", category: "Innerwear & Sleepwear", price: 999, discount: 15, stock: 100, description: "Wireless seamless bralette with light padding. Comfortable everyday wear, no seam marks under clothing. Multiple colours.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Oner Active Fleece Shorts", category: "Innerwear & Sleepwear", price: 1499, discount: 20, stock: 80, description: "Cozy fleece lounge shorts with deep pocket and fold-over waistband. Perfect loungewear for home and light outdoor use.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },
  { name: "Jockey Women's Ankle Socks 6-Pack", category: "Innerwear & Sleepwear", price: 599, discount: 10, stock: 200, description: "Pack of 6 cotton ankle socks with arch support and cushioned sole. Snug fit, breathable yarn for all-day comfort.", photos: ["Innerwear & Sleepwear", "Innerwear & Sleepwear"] },

  // ─── Winter Wear (20) ───
  { name: "Allen Solly Wool Blend Overcoat", category: "Winter Wear", price: 7999, discount: 15, stock: 35, description: "Classic double-breasted overcoat in wool-acrylic blend. Notch lapels, two-button cuffs. Elegant outerwear for winter.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "H&M Teddy Fleece Jacket", category: "Winter Wear", price: 3999, discount: 20, stock: 55, description: "Super cozy teddy fleece jacket with zip-up front and pockets. Soft and plush on the inside, casual and stylish outside.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Columbia Bugaboo II Jacket", category: "Winter Wear", price: 12999, discount: 10, stock: 25, description: "Waterproof, breathable winter jacket with Omni-Heat thermal reflective lining. Packable zip-off fleece inner jacket.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Monte Carlo Knitted Sweater", category: "Winter Wear", price: 1999, discount: 20, stock: 80, description: "Classic round-neck knitted sweater in acrylic wool blend. Ribbed cuffs and hem. A winter wardrobe staple.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Wills Lifestyle Quilted Jacket", category: "Winter Wear", price: 4499, discount: 15, stock: 50, description: "Lightweight quilted jacket with diamond stitch pattern. Zip pockets, zip-up front, packable design for travel.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Spykar Hooded Parka", category: "Winter Wear", price: 5999, discount: 20, stock: 40, description: "Long parka jacket with detachable faux fur hood trim. Side pockets and zip-up front. Ideal for cold, windy winters.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Flying Machine Denim Jacket", category: "Winter Wear", price: 2999, discount: 15, stock: 70, description: "Warm sherpa-lined denim jacket with button-up front. Classic denim exterior with ultra-cozy fleece lining inside.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Provogue Turtle Neck Sweater", category: "Winter Wear", price: 1799, discount: 25, stock: 75, description: "Slim-fit turtle neck sweater in soft ribbed fabric. Pairs with trousers or jeans for a smart winter look.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Jack & Jones Puffer Vest", category: "Winter Wear", price: 3499, discount: 20, stock: 60, description: "Sleeveless puffer vest with zip-up front and inner zip pockets. Lightweight warmth without bulk. Layer over shirts and tees.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Levis Sherpa Trucker Jacket", category: "Winter Wear", price: 8999, discount: 15, stock: 30, description: "Iconic Levi's Trucker jacket with plush sherpa lining. Classic denim exterior, three-button closure. Maximum warmth.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Forever 21 Plaid Scarf", category: "Winter Wear", price: 799, discount: 20, stock: 120, description: "Soft plaid scarf in wool blend. Generous size for wrapping, draping or tying. A cozy winter essential.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Nautica Water-Resistant Anorak", category: "Winter Wear", price: 6999, discount: 10, stock: 35, description: "Pullover anorak with quarter-zip opening and hood. Water-resistant fabric keeps drizzle out. Multiple pockets.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Woodland Genuine Leather Gloves", category: "Winter Wear", price: 1999, discount: 15, stock: 60, description: "Genuine leather winter gloves with fleece lining. Touch-screen compatible fingertips. Warm and stylish for cold days.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Thomas Scott Sweatshirt", category: "Winter Wear", price: 1299, discount: 25, stock: 100, description: "Crew-neck graphic sweatshirt in heavy brushed fleece. Drop-shoulder fit, ribbed cuffs and hem. All-day winter comfort.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Van Heusen Knit Cardigan", category: "Winter Wear", price: 2499, discount: 20, stock: 65, description: "Open-front knit cardigan with button placket and two front pockets. Soft wool-acrylic blend, relaxed fit.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Pepe Jeans Puffer Down Jacket", category: "Winter Wear", price: 7499, discount: 15, stock: 30, description: "Insulated down jacket with stand collar and zip-up front. Lightweight and packable. Extremely warm for harsh winters.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Roadster Knitted Beanie Set", category: "Winter Wear", price: 999, discount: 20, stock: 100, description: "Cozy knitted beanie and matching mittens set. Soft acrylic yarn, ribbed texture. Perfect gift for the winter season.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Qua Checked Overcoat", category: "Winter Wear", price: 8499, discount: 10, stock: 25, description: "Statement checked overcoat in wool blend. Double-breasted with lapel collar. A fashion-forward winter outerwear piece.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "UCB Raglan Sleeve Sweatshirt", category: "Winter Wear", price: 2999, discount: 20, stock: 70, description: "Colour-block raglan sleeve sweatshirt in thick fleece. Relaxed fit with kangaroo pocket. Casual winter staple.", photos: ["Winter Wear", "Winter Wear"] },
  { name: "Mufti Flannel Check Shirt", category: "Winter Wear", price: 1799, discount: 15, stock: 85, description: "Classic flannel check overshirt in soft brushed cotton. Great layering piece over tees and thermals in cool weather.", photos: ["Winter Wear", "Winter Wear"] },

  // ─── Sarees (20) ───
  { name: "Kanjivaram Pure Silk Saree", category: "Sarees", price: 18999, discount: 5, stock: 20, description: "Authentic Kanjivaram pure silk saree with zari border and pallu. Rich in tradition, perfect for weddings and auspicious occasions.", photos: ["Sarees", "Sarees"] },
  { name: "Banarasi Brocade Silk Saree", category: "Sarees", price: 12999, discount: 8, stock: 25, description: "Handwoven Banarasi brocade saree with gold zari motifs. Heavy pallu and intricate border. A timeless bridal choice.", photos: ["Sarees", "Sarees"] },
  { name: "Georgette Printed Party Saree", category: "Sarees", price: 2499, discount: 20, stock: 60, description: "Lightweight georgette saree with digital floral print. Ready-to-wear pre-stitched design with attached blouse.", photos: ["Sarees", "Sarees"] },
  { name: "Cotton Handloom Jamdani Saree", category: "Sarees", price: 4999, discount: 10, stock: 40, description: "UNESCO heritage Jamdani cotton saree with intricate supplementary weft work. Crafted by master weavers of Bengal.", photos: ["Sarees", "Sarees"] },
  { name: "Bollywood Style Sequence Saree", category: "Sarees", price: 3499, discount: 25, stock: 50, description: "Glamorous sequin-embellished saree inspired by Bollywood fashion. Net fabric base with heavy embellishment throughout.", photos: ["Sarees", "Sarees"] },
  { name: "Pochampally Ikat Cotton Saree", category: "Sarees", price: 3999, discount: 15, stock: 45, description: "Authentic Pochampally Ikat saree in cotton. Geometric patterns created using traditional resist-dyeing technique.", photos: ["Sarees", "Sarees"] },
  { name: "Silk Blend Festival Saree", category: "Sarees", price: 2999, discount: 20, stock: 55, description: "Vibrant silk blend saree with jacquard weave border. Bright festive colours, perfect for Puja and cultural events.", photos: ["Sarees", "Sarees"] },
  { name: "Chiffon Embellished Party Saree", category: "Sarees", price: 4499, discount: 15, stock: 35, description: "Sheer chiffon saree with stone and sequin embellishments. Beautiful drape and glamorous look for parties.", photos: ["Sarees", "Sarees"] },
  { name: "Patola Silk Saree Gujarat", category: "Sarees", price: 8999, discount: 10, stock: 20, description: "Heritage Patola double-ikat silk saree from Patan, Gujarat. Intricate geometric and floral patterns. A collector's piece.", photos: ["Sarees", "Sarees"] },
  { name: "Tant Cotton Bengal Saree", category: "Sarees", price: 1799, discount: 15, stock: 70, description: "Lightweight Tant cotton saree in traditional Bengali weave. Thin body with contrast border, perfect for daily wear.", photos: ["Sarees", "Sarees"] },
  { name: "Linen Zari Border Saree", category: "Sarees", price: 2999, discount: 20, stock: 50, description: "Contemporary linen saree with pure zari border. Breathable fabric, elegant drape. Ideal for office and casual occasions.", photos: ["Sarees", "Sarees"] },
  { name: "Mysore Silk Saree", category: "Sarees", price: 5999, discount: 10, stock: 30, description: "GI-tagged Mysore Silk saree with soft texture and golden zari border. Karnataka's pride in silk weaving heritage.", photos: ["Sarees", "Sarees"] },
  { name: "Net Bridal Lehenga Saree", category: "Sarees", price: 6999, discount: 15, stock: 25, description: "Fusion lehenga-style saree in embroidered net fabric. Heavy bridal embellishments with matching blouse piece.", photos: ["Sarees", "Sarees"] },
  { name: "Phulkari Dupatta Saree", category: "Sarees", price: 3499, discount: 20, stock: 45, description: "Vibrant Phulkari embroidery on cotton saree. Traditional Punjabi needlework with floral motifs across the entire fabric.", photos: ["Sarees", "Sarees"] },
  { name: "Organza Floral Print Saree", category: "Sarees", price: 2799, discount: 15, stock: 50, description: "Sheer organza saree with delicate floral print. Crisp texture drapes beautifully. Great for festive and formal occasions.", photos: ["Sarees", "Sarees"] },
  { name: "Soft Silk Kota Doria Saree", category: "Sarees", price: 3999, discount: 10, stock: 40, description: "Lightweight Kota Doria silk saree from Rajasthan. Transparent checks weave with pure zari work. Cool summer drape.", photos: ["Sarees", "Sarees"] },
  { name: "Sambalpuri Ikat Saree Orissa", category: "Sarees", price: 4499, discount: 10, stock: 35, description: "GI-tagged Sambalpuri Ikat saree from Odisha. Rich in tradition with nature-inspired motifs and contrasting borders.", photos: ["Sarees", "Sarees"] },
  { name: "Chanderi Silk Cotton Saree", category: "Sarees", price: 4999, discount: 15, stock: 30, description: "Lightweight Chanderi saree in silk-cotton blend. Delicate gold zari butis on sheer body. Perfect for summer festivals.", photos: ["Sarees", "Sarees"] },
  { name: "Half Half Contrast Saree", category: "Sarees", price: 1999, discount: 25, stock: 65, description: "Modern half-half contrast saree combining two complementary colours. Pre-draped style with attached blouse for easy wear.", photos: ["Sarees", "Sarees"] },
  { name: "Printed Modal Saree Everyday", category: "Sarees", price: 1499, discount: 20, stock: 80, description: "Everyday modal cotton saree with block print pattern. Soft, breathable fabric. Machine washable and low maintenance.", photos: ["Sarees", "Sarees"] },

  // ─── Kurtas & Suits (20) ───
  { name: "Fabindia Cotton Straight Kurta", category: "Kurtas & Suits", price: 1799, discount: 15, stock: 90, description: "Classic straight-cut kurta in handwoven cotton. Mandarin collar with simple embroidery detailing. Pairs with churidars.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Manyavar Nawabi Sherwani", category: "Kurtas & Suits", price: 14999, discount: 10, stock: 20, description: "Regal Nawabi sherwani with intricate gold embroidery. Comes with churidar and matching stole. Perfect for weddings.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Biba A-Line Printed Kurta", category: "Kurtas & Suits", price: 1499, discount: 20, stock: 85, description: "Vibrant A-line kurta with all-over geometric print. Three-quarter sleeves with thread embroidery at neckline.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "W Short Kurtis Party Wear", category: "Kurtas & Suits", price: 1299, discount: 25, stock: 75, description: "Stylish short kurti with sequin embellishments and round neck. Versatile — wear with leggings, jeans or palazzos.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Soch Palazzo Suit 3-Piece", category: "Kurtas & Suits", price: 3499, discount: 20, stock: 50, description: "Complete three-piece palazzo suit with kurta, palazzo pants and dupatta. Embroidered neckline and hem detailing.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Geetanjali Patiala Salwar Set", category: "Kurtas & Suits", price: 2499, discount: 15, stock: 60, description: "Traditional Patiala salwar set with phulkari-inspired embroidery. Comfortable and vibrant for festive occasions.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Sangria Embroidered Kurta Set", category: "Kurtas & Suits", price: 2799, discount: 20, stock: 55, description: "Premium cotton kurta set with mirror work embroidery. Paired with complementing leggings and dupatta. Complete festive look.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Libas Angrakha Kurta", category: "Kurtas & Suits", price: 1999, discount: 15, stock: 65, description: "Stylish Angrakha-style kurta with overlapping front and tie closure. Contemporary ethnic look for modern women.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Biba Unstitched Salwar Suit", category: "Kurtas & Suits", price: 1799, discount: 20, stock: 70, description: "Unstitched Banarasi cotton salwar suit material in festive print. Includes top, bottom and dupatta fabric for custom tailoring.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Global Desi Boho Tunic", category: "Kurtas & Suits", price: 1599, discount: 25, stock: 80, description: "Boho-inspired long tunic with tassel tie-up waist and crochet detailing. Free-spirited look for casual occasions.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Manyavar Jodhpuri Suit", category: "Kurtas & Suits", price: 9999, discount: 10, stock: 25, description: "Elegant Jodhpuri suit with mandarin collar and embroidered buttons. Comes with matching trousers. Great for receptions.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Aurelia Block Print Kurta", category: "Kurtas & Suits", price: 1399, discount: 20, stock: 90, description: "Hand block-printed straight kurta in pure cotton. Artisanal craftsmanship with vegetable dyes. Comfortable and eco-friendly.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Fabseasons Linen Straight Kurta", category: "Kurtas & Suits", price: 1699, discount: 15, stock: 75, description: "Classic straight kurta in linen blend with minimalist design. Ideal for formal and semi-formal occasions.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Shree Men Nehru Jacket Set", category: "Kurtas & Suits", price: 3999, discount: 15, stock: 40, description: "Brocade kurta paired with a Nehru jacket and churidar. Traditional yet contemporary look for weddings and celebrations.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Inddus Sharara Suit Set", category: "Kurtas & Suits", price: 4499, discount: 20, stock: 35, description: "Beautiful Sharara suit with embroidered short kurta and flared sharara pants. Complete with matching dupatta.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Apara Designer Anarkali", category: "Kurtas & Suits", price: 5999, discount: 15, stock: 30, description: "Floor-length Anarkali with heavy embroidery at yoke and border. Comes with churidar and net dupatta. Bridal collection.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Meena Bazaar Lucknowi Chikankari", category: "Kurtas & Suits", price: 2999, discount: 10, stock: 45, description: "Authentic Lucknowi Chikankari kurta in georgette fabric. Hand-embroidered by skilled artisans of Lucknow.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Vedic Collection Dhoti Kurta", category: "Kurtas & Suits", price: 2499, discount: 20, stock: 55, description: "Traditional dhoti-kurta set in cotton blend. Classic Indian ethnic wear perfect for Puja, festivals and ceremonies.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Momzjoy Maternity Kurta Set", category: "Kurtas & Suits", price: 1999, discount: 20, stock: 50, description: "Comfortable maternity kurta set designed for growing bump. Elasticated waist, loose silhouette, soft cotton fabric.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
  { name: "Kayseria Embroidered Suit Pakistani", category: "Kurtas & Suits", price: 3499, discount: 15, stock: 40, description: "Elegant three-piece suit with embroidered lawn fabric, inner pants and chiffon dupatta. Festive and sophisticated.", photos: ["Kurtas & Suits", "Kurtas & Suits"] },
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
      const photoPool = PHOTOS[p.category] || PHOTOS["Women's Wear"];

      // Pick 2 distinct photos from the pool
      const idx1 = i % photoPool.length;
      const idx2 = (i + 1) % photoPool.length;
      const images = [
        { url: imgUrl(photoPool[idx1]), public_id: photoPool[idx1] },
        { url: imgUrl(photoPool[idx2]), public_id: photoPool[idx2] },
      ];

      const { photos: _photos, ...productData } = p;
      const rating = parseFloat((4.0 + Math.random() * 0.9).toFixed(1));
      const numReviews = Math.floor(50 + Math.random() * 500);

      const product = await Product.create({
        ...productData,
        images,
        rating,
        numReviews,
        isActive: true,
      });

      created.push(product);
      process.stdout.write(`[${i + 1}/${PRODUCTS.length}] ✓ ${product.name}\n`);
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
