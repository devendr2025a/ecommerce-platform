const mongoose = require("mongoose");
const dns = require("dns");

// Fix for strict Wi-Fi or ISP DNS (IPv6) blocking SRV queries in Node.js
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4 // Force IPv4 to bypass 'querySrv ECONNREFUSED' issues on some Wi-Fi
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const msg = error.message || "";

    if (
      msg.includes("IP") ||
      msg.includes("whitelist") ||
      msg.includes("ECONNREFUSED")
    ) {
      console.error("❌ MongoDB blocked — likely causes:");
      console.error(
        "1. Your IP is not whitelisted on Atlas → Network Access → Add 0.0.0.0/0"
      );
      console.error(
        "2. Firewall blocking port → try using mobile hotspot"
      );
    } else {
      console.error(`❌ MongoDB connection error: ${msg}`);
    }

    throw error;
  }
};

module.exports = connectDB;