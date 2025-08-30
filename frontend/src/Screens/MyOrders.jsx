import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

export default function MyOrders() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from backend
    const fetchMyOrders = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            setError("Please log in to see your orders.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });

            if (!response.ok) throw new Error("Failed to fetch orders.");

            const data = await response.json();

            // Keep the full order objects as returned from backend
            if (data.orderData && data.orderData.length > 0) {
                setOrderData(data.orderData);
            } else {
                setOrderData([]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/cancelOrder/${orderId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to cancel order.");

            // Refresh orders after cancellation
            fetchMyOrders();
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h1 className="text-center fw-bold mb-4">My Orders</h1>

                {loading && <p className="text-center">Loading orders...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                {!loading && !error && orderData.length === 0 && (
                    <p className="text-center">You have no past orders.</p>
                )}

                {!loading && !error && orderData.length > 0 && (
                    <div className="row g-4"> {/* ✅ d-flex flex-wrap को row g-4 में बदल दिया */}
                        {orderData.map((order, index) => (
                            <div key={index} className="col-12 col-md-6"> {/* ✅ हर ऑर्डर को एक कॉलम में रखें */}
                                <div className="table-responsive rounded-3 overflow-hidden shadow-lg"> {/* ✅ यहाँ से mb-4 हटा दिया */}
                                    <table className="table table-dark table-hover align-middle text-center mb-0">
                                        <thead className="table-success text-dark">
                                            <tr>
                                                <th colSpan="5" className="text-start fs-5">
                                                    Order on: {new Date(order.order_date).toLocaleString()}
                                                </th>
                                                <th colSpan="1" className="text-end">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleCancelOrder(order._id)}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.order_data?.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <th scope="row">{itemIndex + 1}</th>
                                                    <td>
                                                        <img
                                                            src={item.img}
                                                            alt={item.name}
                                                            style={{
                                                                width: "60px",
                                                                height: "40px",
                                                                objectFit: "cover",
                                                            }}
                                                            className="rounded"
                                                        />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.qty}</td>
                                                    <td className="fw-bold text-success">₹{item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}