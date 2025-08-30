// File: models/user.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // ✅ यह orders ऐरे है
    orders: [
        {
            order_data: { type: Array, required: true },
            order_date: { type: Date, default: Date.now }
        }
    ]
});

const User = mongoose.model('user', userSchema);
export default User;