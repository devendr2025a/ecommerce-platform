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

// Image files organized by category
const accessoriesImages = {
  'Cap': [
    '2nd summmer cap.webp',
    'all cap.webp',
    'cap summer.webp',
    'cap winter.jpg',
    'cap women.webp',
    'cap.jpg'
  ],
  'Dupatta': [
    'bandhani duppata.jpg',
    'bandhej-art dupatta.webp',
    'brideal red net Dupatta.webp',
    'cotton dupatta.webp',
    'mirror work Dupatta.webp',
    'multi colour Dupatta.jpg',
    'multicolor-bandhej-cotton-dupatta.jpg',
    'pink cotton dupatta.jpg',
    'printed-cotton-dupatta.jpg',
    'pure cotton dupatta.jpeg',
    'silk black dupatta.jpg',
    'white and pink cotton Dupatta.webp',
    'white cotton dupatta.jpg'
  ],
  'Socks': [
    'cotton shocks.jpg',
    'cotton stretch shocks.jpg',
    'cut peds shocks.jpg',
    'girls multicolor shocks.jpg',
    'kids-shocks.webp',
    'mens comfortable shocks.jpg',
    'mens cut shocks.jpg',
    'multicolor socks.webp',
    'printed cut shocks.webp',
    'rose design women shocks.jpg',
    'women shocks.jpg',
    'white shock mens.jpg',
    'football shocks.webp'
  ],
  'Napkin': [
    'baby napkin multicolor.webp',
    'baby cloth napkin.jpg',
    'body face napkin.webp',
    'cotton face napkin.webp',
    'cotton kichen napkin.jpg',
    'cotton napkin  face.webp',
    'diner napkin.jpg',
    'kitchen napkin.webp',
    'multiy type napkin.jpg',
    'napkin.jpg',
    'napkins.jpg',
    'plain white cotton napkin.jpg',
    'white napkin.jpg'
  ]
};

async function uploadImages() {
  const uploadedImages = {};

  for (const [category, files] of Object.entries(accessoriesImages)) {
    uploadedImages[category] = [];
    console.log(`\nUploading ${category} images...`);

    for (const file of files) {
      const filePath = path.join(downloadsFolder, file);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        continue;
      }

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `Accessories/${category}`,
          public_id: file.replace(/\.[^/.]+$/, ''),
          overwrite: true,
        });

        uploadedImages[category].push({
          fileName: file,
          url: result.secure_url,
          publicId: result.public_id,
        });

        console.log(`✅ Uploaded: ${file}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error.message);
      }
    }
  }

  // Save to file
  fs.writeFileSync(
    path.join(__dirname, 'uploadedAccessoriesImages.json'),
    JSON.stringify(uploadedImages, null, 2)
  );

  console.log('\n✅ All images uploaded! Data saved to uploadedAccessoriesImages.json');

  // Summary
  console.log('\n--- SUMMARY ---');
  for (const [category, images] of Object.entries(uploadedImages)) {
    console.log(`${category}: ${images.length} images uploaded`);
  }
}

uploadImages().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
