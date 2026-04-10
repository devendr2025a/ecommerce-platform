const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const downloadsFolder = 'C:\\Users\\Khushi\\Downloads';

// Linen Shirts & Pants images
const linenImages = [
  { src: 'Cream-Linen-Shirt-Priveeparis-M23220-5_748058c1-6601-4824-a54d-05a8baa94751.jpg.webp', name: 'Cream-Linen-Shirt-Priveeparis' },
  { src: 'mousse-linen-mens-oxford-shirt-slim-fitsaphedmen-shirtsciceroni-662025.webp', name: 'Mousse-Linen-Oxford-Shirt' },
  { src: 'mati-shirts-tops-men-s-roots-beige-short-kurta-men-s-roots-beige-short-kurta-33347162275929.jpg.webp', name: 'Mati-Roots-Beige-Kurta' },
  { src: 'mens  slim running pants.avif', name: 'Mens-Slim-Running-Pants' },
  { src: 'mens round neck ti shirt.webp', name: 'Mens-Round-Neck-TShirt' },
  { src: 'Round neck t-shirt.webp', name: 'Round-Neck-TShirt-Classic' },
  { src: 'Round neck ti shirt.avif', name: 'Round-Neck-TShirt-Premium' },
  { src: 'Oversize t-shirt.webp', name: 'Oversize-TShirt-Casual' },
  { src: 'regular ti-shirt.webp', name: 'Regular-TShirt' },
  { src: 'cotton crew neck ti-shirt.webp', name: 'Cotton-Crew-Neck-TShirt' },
  { src: 'mens jamaica.jpg', name: 'Mens-Jamaica-Shorts' },
  { src: 'Printed Shirt & Pyjamas set.webp', name: 'Printed-Shirt-Pyjamas-Set' },
  { src: 'Cream-Linen-Shirt-Priveeparis-M23220-5_748058c1-6601-4824-a54d-05a8baa94751.jpg.webp', name: 'Linen-Shirt-Formal' }
];

async function uploadLinenImages() {
  const uploadedImages = [];

  console.log('📤 Uploading Linen Shirts & Pants images...\n');

  for (const item of linenImages) {
    const filePath = path.join(downloadsFolder, item.src);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${item.src}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'Linen_Shirts_Pants',
        public_id: item.name,
        overwrite: true,
      });

      uploadedImages.push({
        name: item.name,
        url: result.secure_url,
      });

      console.log(`✅ Uploaded: ${item.name}`);
    } catch (error) {
      console.error(`❌ Error uploading ${item.name}:`, error.message);
    }
  }

  console.log(`\n✅ Successfully uploaded ${uploadedImages.length} Linen images!\n`);
  
  // Output URLs for seed script
  console.log('📋 URLs for seed script:\n');
  uploadedImages.forEach((img, i) => {
    console.log(`${i + 1}. "${img.url}"`);
  });

  return uploadedImages;
}

async function main() {
  try {
    await uploadLinenImages();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
