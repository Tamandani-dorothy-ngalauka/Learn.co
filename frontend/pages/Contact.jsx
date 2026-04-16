import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!formData.email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    if (formData.message.length < 5) {
      setStatus("Message is too short.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Contact error:", error);
      setStatus(error.message || "Server error");
    }
  }

  return (
    <div className="contact">
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <textarea name="message" placeholder="Message" onChange={handleChange} value={formData.message} />
        <button type="submit">Send</button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}