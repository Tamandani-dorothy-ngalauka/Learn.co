import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful");
      navigate("/my-courses");

    } catch (err) {
      setError(err.message || "Server error");
    }
  }

 return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="form-section">
        <h2>Login</h2>
        <p>Enter your account details</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          {error && <p className="error">{error}</p>}

        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="image-section">
        <h1>Welcome to<br />student portal</h1>
        <p>Login to access your account</p>
        <img src={login} alt="login" />
      </div>

    </div>
  );
}