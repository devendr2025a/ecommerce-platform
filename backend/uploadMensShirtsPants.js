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

// Men's shirts and formal pants images
const mensShirtsPants = [
  { src: 'Cream-Linen-Shirt-Priveeparis-M23220-5_748058c1-6601-4824-a54d-05a8baa94751.jpg.webp', name: 'Cream-Linen-Shirt-Priveeparis' },
  { src: 'mousse-linen-mens-oxford-shirt-slim-fitsaphedmen-shirtsciceroni-662025.webp', name: 'Mousse-Linen-Oxford-Shirt' },
  { src: 'Printed Shirt & Pyjamas set.webp', name: 'Printed-Shirt-Pyjamas-Set' },
  { src: 'mens jamaica.jpg', name: 'Mens-Jamaica-Pants' }
];

async function uploadMensShirtsPants() {
  const uploadedImages = [];

  console.log('📤 Uploading Men\'s Shirts & Pants images...\n');

  for (const item of mensShirtsPants) {
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

  console.log(`\n✅ Successfully uploaded ${uploadedImages.length} Men's Shirts & Pants images!\n`);

  // Output URLs for seed script
  console.log('📋 URLs for seed script:\n');
  uploadedImages.forEach((img, i) => {
    console.log(`${i + 1}. "${img.url}"`);
  });

  return uploadedImages;
}

async function main() {
  try {
    await uploadMensShirtsPants();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
