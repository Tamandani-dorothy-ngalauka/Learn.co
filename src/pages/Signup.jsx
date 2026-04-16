import React, { useState } from "react";

export default function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const response = await fetch("https://satisfied-adaptation-production-cf47.up.railway.app/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    password
  })
});

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully!");
        setError("");

        // clear form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

      } else {
        setError(data.message);
      }

    } catch (error) {
      setError("Server error");
    }
  }

  return (
    <div className="signup">

      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

        </form>
      </div>

    </div>
  );
}

