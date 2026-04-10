const fs = require('fs');
const path = require('path');

const downloadsFolder = 'C:\\Users\\Khushi\\Downloads';

// Specific Linen Shirts & Pants images
const linenImages = [
  'Cream-Linen-Shirt-Priveeparis-M23220-5_748058c1-6601-4824-a54d-05a8baa94751.jpg.webp',
  'mousse-linen-mens-oxford-shirt-slim-fitsaphedmen-shirtsciceroni-662025.webp',
  'mati-shirts-tops-men-s-roots-beige-short-kurta-men-s-roots-beige-short-kurta-33347162275929.jpg.webp',
  'mens round neck ti shirt.webp',
  'Round neck t-shirt.webp',
  'Round neck ti shirt.avif',
  'mens comfortable shocks.jpg', // This is socks, not for linen
  'mens solid innnerwear.webp',
  'mens jamaica.jpg',
  'Printed Shirt & Pyjamas set.webp',
  'Oversize t-shirt.webp',
  'regular ti-shirt.webp',
  'mens slim running pants.avif',
  'cotton crew neck ti-shirt.webp',
];

console.log('🔍 Checking for Linen Shirts & Pants images:\n');

const existingFiles = [];
const notFound = [];

linenImages.forEach(file => {
  const filePath = path.join(downloadsFolder, file);
  if (fs.existsSync(filePath)) {
    existingFiles.push(file);
    console.log(`✅ Found: ${file}`);
  } else {
    notFound.push(file);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Found: ${existingFiles.length} images`);
console.log(`   Not found: ${notFound.length} images`);

if (notFound.length > 0) {
  console.log(`\n⚠️  Not found:`);
  notFound.forEach(f => console.log(`   - ${f}`));
}

console.log('\nActual Linen Shirts & Pants images to upload:');
existingFiles.forEach((f, i) => {
  console.log(`${i + 1}. ${f}`);
});
