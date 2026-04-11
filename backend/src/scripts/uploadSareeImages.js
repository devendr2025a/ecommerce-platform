/**
 * Upload silk saree images to Cloudinary
 * Usage: node src/scripts/uploadSareeImages.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../config/cloudinary');

const sareeImageFiles = [
  { file: 'saree-1.webp', name: 'Gold Silk Saree' },
  { file: 'saree-2.webp', name: 'Maroon Silk Saree with Border' },
  { file: 'saree-3.webp', name: 'Deep Red Banarasi Silk Saree' },
  { file: 'saree-4.webp', name: 'Emerald Green Silk Saree' },
  { file: 'saree-5.webp', name: 'Royal Blue Silk Saree Premium' },
];

const uploadToCloudinary = async () => {
  try {
    console.log('🚀 Starting silk saree image upload to Cloudinary...\n');
    
    const uploadedUrls = {};
    
    for (const img of sareeImageFiles) {
      const imagePath = path.join(__dirname, '../../public/images', img.file);
      
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found: ${imagePath}`);
        continue;
      }
      
      try {
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: 'ecommerce/products/sarees',
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
    
    // Merge saree images
    Object.assign(allImages, uploadedUrls);
    
    // Save all URLs
    fs.writeFileSync(configPath, JSON.stringify(allImages, null, 2));
    console.log(`\n📁 Updated image URLs saved to: src/config/uploadedImages.json`);
    
    console.log('\n✨ Silk saree upload complete!\n');
    return uploadedUrls;
    
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    process.exit(1);
  }
};

uploadToCloudinary();
