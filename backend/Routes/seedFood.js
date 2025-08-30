import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Flexible schema for JSON data
const FoodSchema = new mongoose.Schema({}, { strict: false });

// ✅ Use explicit collection name to avoid creating a new one
const Food = mongoose.model("Food", FoodSchema, "Food_collections");

// POST endpoint to insert JSON data from the request body
router.post("/insert-food", async (req, res) => {
  try {
    // Check if the request body is an array or a single object
    const dataToInsert = Array.isArray(req.body) ? req.body : [req.body];
    
    // Insert the data into the existing collection
    await Food.insertMany(dataToInsert);
    
    res.status(200).send("Data inserted successfully into Food_collections!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data: " + err.message);
  }
});

export default router;
