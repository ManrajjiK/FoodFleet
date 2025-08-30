import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: {
        type: Array,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema);

export default Order;