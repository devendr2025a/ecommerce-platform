/**
 * Run this script once to create an admin user:
 *   node src/scripts/createAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const ADMIN = {
  name: 'Admin',
  email: process.env.ADMIN_EMAIL || 'admin@shopeasy.com',
  password: process.env.ADMIN_PASSWORD || 'Admin@123',
  role: 'admin',
  phone: '9999999999',
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save({ validateBeforeSave: false });
        console.log(`✅ Existing user "${ADMIN.email}" promoted to admin`);
      } else {
        console.log(`ℹ️  Admin "${ADMIN.email}" already exists`);
      }
    } else {
      await User.create(ADMIN);
      console.log(`✅ Admin user created: ${ADMIN.email} / ${ADMIN.password}`);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
