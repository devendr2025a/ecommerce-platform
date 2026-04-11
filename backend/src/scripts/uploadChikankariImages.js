/**
 * Upload Chikankari Suits images to Cloudinary
 * Usage: node src/scripts/uploadChikankariImages.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../config/cloudinary');

const chikankariImageFiles = [
  { file: 'chikankari-1.webp', name: 'White Chikankari Suit Set' },
  { file: 'chikankari-2.webp', name: 'Cream Chikankari Kurta Palazzo' },
  { file: 'chikankari-3.webp', name: 'Beige Chikankari Designer Suit' },
  { file: 'chikankari-4.webp', name: 'Peach Chikankari Formal Suit' },
  { file: 'chikankari-5.webp', name: 'Ivory Chikankari Premium Set' },
];

const uploadToCloudinary = async () => {
  try {
    console.log('🚀 Starting Chikankari Suits image upload to Cloudinary...\n');
    
    const uploadedUrls = {};
    
    for (const img of chikankariImageFiles) {
      const imagePath = path.join(__dirname, '../../public/images', img.file);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found: ${imagePath}`);
        continue;
      }
      
      try {
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: 'ecommerce/products/chikankari',
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
    
    // Load existing images and merge
    const configPath = path.join(__dirname, '../config/uploadedImages.json');
    let allImages = {};
    if (fs.existsSync(configPath)) {
      allImages = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    
    // Merge chikankari images
    Object.assign(allImages, uploadedUrls);
    
    // Save all URLs
    fs.writeFileSync(configPath, JSON.stringify(allImages, null, 2));
    console.log(`\n📁 Updated image URLs saved to: src/config/uploadedImages.json`);
    
    console.log('\n✨ Chikankari Suits upload complete!\n');
    return uploadedUrls;
    
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    process.exit(1);
  }
};

uploadToCloudinary();
