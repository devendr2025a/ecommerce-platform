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

// Pashmina shawl images
const pashmineImages = [
  'B-Vipul-Shanvi-Pashamina-NavyBlue_1_1024x1024.jpg.webp',
  'pashtush-pashmina-pashtush-mens-woven-ethnic-stole-extra-soft-bamboo-fibre-29238723379254.jpg.webp',
  'pashtush-pashmina-pashtush-women-faux-pashmina-shawl-ethnic-weave-design-beige-30746404225078.jpg',
  'navy-blue-color-kashmiri-shawl-aari-jaal-trendy-wearer-work-524.jpg',
  'stylish-beige-colour-kashmiri-sozni-shawl-embellished-designer-four-sided-running-border-853.jpg.webp'
];

async function uploadPashmineImages() {
  const uploadedImages = [];

  console.log('📤 Uploading Pashmina Shawl images...\n');

  for (const file of pashmineImages) {
    const filePath = path.join(downloadsFolder, file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'Pashmina_Shawls',
        public_id: file.replace(/\.[^/.]+$/, ''),
        overwrite: true,
      });

      uploadedImages.push({
        fileName: file,
        url: result.secure_url,
        publicId: result.public_id,
      });

      console.log(`✅ Uploaded: ${file}`);
    } catch (error) {
      console.error(`❌ Error uploading ${file}:`, error.message);
    }
  }

  // Save to file
  fs.writeFileSync(
    path.join(__dirname, 'uploadedPashmineImages.json'),
    JSON.stringify(uploadedImages, null, 2)
  );

  console.log(`\n✅ Uploaded ${uploadedImages.length} Pashmina images!`);
  console.log('📁 Data saved to uploadedPashmineImages.json\n');

  return uploadedImages;
}

async function main() {
  try {
    await uploadPashmineImages();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
