import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI; // env se le rahe hai

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    const food_items = await mongoose.connection.db.collection("Food_collections").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("Food_category").find({}).toArray();

    global.food_items = food_items;
    global.foodCategory = foodCategory;

  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
