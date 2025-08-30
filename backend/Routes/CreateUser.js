import express from "express";
import { body, validationResult } from "express-validator";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../Models/order.js";

dotenv.config();

const UserRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

// ================= REGISTER =================

UserRouter.post("/Register", [
  body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("Error in /Register route:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================= LOGIN =================

UserRouter.post("/Login", [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Error in /Login route:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ================= ORDER DATA ROUTES (सुधारित) =================

UserRouter.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    // ✅ यूजर डॉक्यूमेंट ढूंढें
    let existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      // अगर यूजर नहीं मिला तो एरर भेजें
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // ✅ नया ऑर्डर ऑब्जेक्ट बनाएं
    const newOrder = {
      order_data: order_data,
      order_date: order_date
    };

    // ✅ यूजर डॉक्यूमेंट के orders ऐरे में नया ऑर्डर डालें
    existingUser.orders.push(newOrder);
    await existingUser.save();

    res.status(200).json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    console.error("Error in /orderData route:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

UserRouter.post("/myOrderData", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail }); // Order के बजाय User मॉडल का उपयोग करें

    if (!user || !user.orders || user.orders.length === 0) {
      return res.status(200).json({ success: true, orderData: [] });
    }

    res.json({ success: true, orderData: user.orders });
  } catch (error) {
    console.error("Error in /myOrderData route:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});


UserRouter.delete("/cancelOrder/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    const user = await User.findOne({ "orders._id": orderId });
    if (!user) return res.status(404).json({ success: false, message: "Order not found" });

    user.orders = user.orders.filter(order => order._id.toString() !== orderId);
    await user.save();

    res.json({ success: true, message: "Order canceled successfully!" });
  } catch (error) {
    console.error("Error in /cancelOrder:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default UserRouter;