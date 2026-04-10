/**
 * Upload product images to Cloudinary
 * Usage: node src/scripts/uploadImagesToCloudinary.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../config/cloudinary');

const imageFiles = [
  { file: 'kurta-1.webp', name: 'Premium White Cotton Kurta' },
  { file: 'kurta-2.webp', name: 'Maroon Pure Cotton Kurta' },
  { file: 'kurta-3.webp', name: 'Navy Blue Cotton Kurta' },
  { file: 'kurta-4.webp', name: 'Beige Plain Cotton Kurta' },
  { file: 'kurta-5.webp', name: 'Green Printed Cotton Kurta' },
  { file: 'product.webp', name: 'Generic Product' },
];

const uploadToCloudinary = async () => {
  try {
    console.log('🚀 Starting image upload to Cloudinary...\n');
    
    const uploadedUrls = {};
    
    for (const img of imageFiles) {
      const imagePath = path.join(__dirname, '../../public/images', img.file);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found: ${imagePath}`);
        continue;
      }
      
      try {
        // Upload file directly using file path
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: 'ecommerce/products',
          public_id: img.file.replace('.webp', ''),
          resource_type: 'image',
          overwrite: true,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        });
        
        uploadedUrls[img.file] = {
          url: result.secure_url,
          public_id: result.public_id,
          name: img.name
        };
        
        console.log(`✅ Uploaded: ${img.file}`);
        console.log(`   URL: ${result.secure_url}\n`);
      } catch (err) {
        console.error(`❌ Error uploading ${img.file}:`, err.message);
      }
    }
    
    // Save URLs to a config file
    const configPath = path.join(__dirname, '../config/uploadedImages.json');
    fs.writeFileSync(configPath, JSON.stringify(uploadedUrls, null, 2));
    console.log(`\n📁 Image URLs saved to: src/config/uploadedImages.json`);
    
    console.log('\n✨ Upload complete! URLs are ready to use.\n');
    return uploadedUrls;
    
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    process.exit(1);
  }
};

uploadToCloudinary();
