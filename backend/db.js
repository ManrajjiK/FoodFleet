import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://kewatmanraj797:Manraj797@cluster01.izndwoh.mongodb.net/PetPooja?retryWrites=true&w=majority&appName=cluster01";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    // Correct collection names
    const food_items = await mongoose.connection.db.collection("Food_collections").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("Food_category").find({}).toArray();

    // Set as global variables
    global.food_items = food_items;
    global.foodCategory = foodCategory;

    // Console log fetched data
    // console.log("Fetched food items:", food_items);
    // console.log("Fetched food categories:", foodCategory);

  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;
