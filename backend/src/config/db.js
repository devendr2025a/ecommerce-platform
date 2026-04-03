const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,  // 30s — gives more time on slow networks
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const msg = error.message || '';
    if (msg.includes('IP') || msg.includes('whitelist') || msg.includes('ECONNREFUSED')) {
      console.error('❌ MongoDB blocked — likely causes:');
      console.error('   1. Your IP is not whitelisted on Atlas → https://cloud.mongodb.com → Network Access → Add 0.0.0.0/0');
      console.error('   2. Office/corporate firewall blocking port 27017 → try using mobile hotspot');
    } else {
      console.error(`❌ MongoDB connection error: ${msg}`);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
