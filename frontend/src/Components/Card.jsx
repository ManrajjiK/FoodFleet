// Card.js
import React from "react";
import { useDispatchCart } from "./ContextReducer";

export default function Card({ name, img, description, options }) {
  const dispatch = useDispatchCart();
  const priceOptions = options && options.length > 0 ? options[0] : null;
  const hasOptions = priceOptions && Object.keys(priceOptions).length > 0;
  const initialPrice = hasOptions ? Object.values(priceOptions)[0] : 0;

  const handleAddToCart = () => {
    // ✅ Generate a unique ID for each new cart item
    const uniqueId = Date.now();

    // Dispatch a new "ADD" action with the unique ID
    dispatch({
      type: "ADD",
      id: uniqueId, // The unique identifier
      name: name,
      img: img,
      description: description,
      price: initialPrice,
      qty: 1,
    });

    
  };

  return (
    <div className="card m-3 shadow-lg p-2" style={{ width: "18rem", backgroundColor: "#1a1a1a", color: "white" }}>
      <img
        src={img}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        <p className="card-text" style={{ fontSize: "14px", color: "#ccc" }}>
          {description}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          {hasOptions && (
            <select className="form-select form-select-sm w-50">
              {Object.keys(priceOptions).map((key, index) => (
                <option key={index} value={priceOptions[key]}>
                  {key}
                </option>
              ))}
            </select>
          )}
          <span className="fw-bold text-success">
            ₹{initialPrice}
          </span>
        </div>
        <button className="btn btn-success w-100 mt-3" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}