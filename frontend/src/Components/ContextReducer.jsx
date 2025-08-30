// ContextReducer.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const newState = [
                ...state,
                {
                    id: action.id, // Now using the unique ID
                    name: action.name,
                    img: action.img,
                    description: action.description,
                    price: action.price,
                    qty: action.qty,
                },
            ];
            // Save the new state to localStorage
            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;

        case "REMOVE_FROM_CART":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            // Save the new state to localStorage
            localStorage.setItem("cart", JSON.stringify(newArr));
            return newArr;

        case "DROP_CART":
            // Clear the cart and localStorage
            localStorage.removeItem("cart");
            return [];

        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    // Initialize the state from localStorage on app load
    const initialState = JSON.parse(localStorage.getItem("cart")) || [];
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);