import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

export default function Cart() {
    const cart = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleRemove = (index) => {
        dispatch({ type: "REMOVE_FROM_CART", index });
    };

    const totalPrice = cart.reduce((total, item) => total + parseInt(item.price), 0);

    const handleCheckout = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            alert("Please log in to proceed.");
            return navigate("/login");
        }

        const orderData = {
            email: userEmail,
            order_data: cart,
            order_date: new Date().toISOString(),
        };

        try {
            // ✅ URL को सही किया गया है
            const response = await fetch("http://localhost:5000/api/auth/orderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                dispatch({ type: "DROP_CART" });
                localStorage.removeItem("cart");
                alert("Order placed successfully!");
                navigate("/myorders");
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container text-center mt-5">
                    <h3 className="text-muted">Your Cart is Empty 🛒</h3>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3 className="mb-4 fw-bold text-center">🛒 Your Cart</h3>
                <table className="table table-dark table-hover text-center align-middle rounded-3 overflow-hidden">
                    <thead className="table-success text-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        style={{ width: "60px", height: "40px", objectFit: "cover" }}
                                        className="rounded"
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td style={{ fontSize: "14px", color: "#aaa" }}>
                                    {item.description}
                                </td>
                                <td className="fw-bold text-success">₹{item.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <h4>Total: <span className="text-success">₹{totalPrice}</span></h4>
                    <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </>
    );
}