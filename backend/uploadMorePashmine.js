const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Additional Pashmina images to upload
const additionalImages = [
  { src: 'C:\\Users\\Khushi\\Downloads\\B-Vipul-Kashifa-Beige_5_1024x1024.jpg.webp', name: 'Kashifa-Beige-Pashmina' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\18_0b988808-4ae6-44e0-895c-e626cac0b118.jpg.webp', name: 'Pashmina-Stole-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\61+G0Ua3+9L._AC_UY1100_.jpg', name: 'Designer-Pashmina-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\71Fl0uUnKlL._AC_UY350_.jpg', name: 'Premium-Pashmina-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\71LnRNeIOwL._AC_UY1100_.jpg', name: 'Kashmiri-Pashmina-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\71MYZKEIigL._AC_UY1100_.jpg', name: 'Heritage-Pashmina-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\71oZgdutZfL._AC_UY350_.jpg', name: 'Elegant-Pashmina-1' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\5-ethnic-winter-fashion-ideas-women.webp', name: 'Ethnic-Winter-Pashmina' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\41dQPsWe25L._AC_UY350_.jpg', name: 'Traditional-Pashmina' },
  { src: 'C:\\Users\\Khushi\\Downloads\\Pashmina Stole Extract\\Pashmina Stole\\Design 1.webp', name: 'Pashmina-Design-1' }
];

async function uploadAdditionalImages() {
  const uploadedImages = [];

  console.log('📤 Uploading Additional Pashmina Shawl images...\n');

  for (const item of additionalImages) {
    if (!fs.existsSync(item.src)) {
      console.log(`⚠️  File not found: ${item.src}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(item.src, {
        folder: 'Pashmina_Shawls',
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

  console.log(`\n✅ Uploaded ${uploadedImages.length} additional Pashmina images!`);
  
  // Output as JSON for use in seed script
  console.log('\n📋 URLs for seed script:\n');
  uploadedImages.forEach((img, i) => {
    console.log(`${i + 6}. "${img.url}"`);
  });

  return uploadedImages;
}

async function main() {
  try {
    await uploadAdditionalImages();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
