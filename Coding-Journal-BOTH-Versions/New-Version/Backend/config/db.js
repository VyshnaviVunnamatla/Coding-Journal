import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("MONGO_URL env var is missing");
    throw new Error("MONGO_URL not set");
  }
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
