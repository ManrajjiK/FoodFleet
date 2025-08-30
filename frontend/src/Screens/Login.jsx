import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // ✅ यह लाइन बहुत महत्वपूर्ण है
        localStorage.setItem("userEmail", data.user.email);
        navigate('/');
      } else {
        setError(data.message || "⚠️ Invalid credentials");
      }
    } catch (err) {
      setError("⚠️ Server not responding");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "black" }}>
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#176E2E" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill px-3 py-2"
              id="email"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "white" }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-3 py-2"
              id="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "none", color: "white" }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 rounded-pill fw-bold"
            style={{ background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)", border: "none", color: "white", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
          >
            Login
          </button>
        </form>
        {error && (
          <div className="mt-3 p-2 rounded text-center fw-bold" style={{ background: "rgba(255, 71, 87, 0.2)", color: "#ff4757" }}>
            {error}
          </div>
        )}
        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/SignUp" style={{ color: "#ffd369", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}