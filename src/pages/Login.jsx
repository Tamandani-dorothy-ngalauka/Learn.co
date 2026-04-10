import { useState } from "react";
import "./Form.css";
import login from "../pictures/login.png";
import { useNavigate } from "react-router-dom";

function Form() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // Handle input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Handle login submit
  async function handleSubmit(e) {
    e.preventDefault();

    // simple validation
    if (!formData.email.includes("@")) {
      setError("Invalid Email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password is too short!");
      return;
    }

    try {

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {

        // save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        // redirect to My Courses page
        navigate("/my-courses");

      } else {
        setError(data.message);
      }

    } catch (err) {
      setError("Server connection failed");
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

export default Form;

