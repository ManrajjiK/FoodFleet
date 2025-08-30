import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaShoppingBag, FaHome } from "react-icons/fa";
import { useCart } from "./ContextReducer"; // useDispatchCart is not used here, so you can remove it if you want.

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const cart = useCart(); // ✅ यह लाइन सही है

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fw-bold fst-italic" to="/">
          FoodFleet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5 d-flex align-items-center" to="/">
                <FaHome size={20} style={{ marginRight: "5px" }} />
                Home
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 d-flex align-items-center"
                  to="/myorders"
                >
                  <FaShoppingBag size={20} style={{ marginRight: "5px" }} />
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center position-relative">
            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn bg-white text-success mx-1" to="/Login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/SignUp">
                  SignUp
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="nav-link active fs-5 d-flex align-items-center"
                  to="/Cart"
                >
                  <FaShoppingCart size={20} style={{ marginRight: "5px" }} />
                  My Cart
                  {cart.length > 0 && ( // ✅ यहां cart.length का उपयोग करें
                    <span className="badge bg-danger ms-2">{cart.length}</span>
                  )}
                </Link>
                <div style={{ position: "relative" }}>
                  <FaUserCircle
                    size={30}
                    color="#fff"
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      height: "50px",
                      width: "auto",
                    }}
                    onClick={() => setOpen(!open)}
                  />
                  {open && (
                    <div
                      style={{
                        position: "absolute",
                        top: "35px",
                        right: "0",
                        background: "#fff",
                        color: "#000",
                        padding: "10px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                        width: "250px",
                        zIndex: 100,
                      }}
                    >
                      <h6 className="fw-bold mb-2">User Profile</h6>
                      <br />
                      <p className="mb-1 fw-bold">{user?.name}</p>
                      <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                        {user?.email}
                      </p>
                      <Link
                        className="btn bg-success text-white fw-bold w-100"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}