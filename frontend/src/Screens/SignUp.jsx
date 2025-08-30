import React, { useState } from "react";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");   // ✅ success message
  const [error, setError] = useState("");       // ❌ error message

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 User registered successfully!.. Login for further process..");
        alert(" congrats User Registered successful!!");


      } else {
        setError(data.message || "Something went wrong!  ");
        alert("enter valid credentials");
      }
    } catch (err) {
      setError("⚠️ Server not responding");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "black",
      }}
    >
      {/* Glassmorphism Card */}
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
        <h2 className="text-center mb-4 fw-bold" style={{color: "#176E2E"}}>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group mb-3">
            <label htmlFor="name" className="fw-semibold">Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-3 py-2"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleChange}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
              }}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1" className="fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control rounded-pill px-3 py-2"
              id="exampleInputEmail1"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={handleChange}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1" className="fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill px-3 py-2"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
              }}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 rounded-pill fw-bold"
            style={{
              background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
              border: "none",
              color: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div
            className="mt-3 p-2 rounded text-center fw-bold"
            style={{ background: "rgba(46, 213, 115, 0.2)", color: "#2ed573" }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            className="mt-3 p-2 rounded text-center fw-bold"
            style={{ background: "rgba(255, 71, 87, 0.2)", color: "#ff4757" }}
          >
            {error}
          </div>
        )}

        {/* Login link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a
            href="/Login"
            style={{
              color: "#ffd369",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
