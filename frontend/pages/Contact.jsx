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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <div className="page">

      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you</p>
        </div>
      </section>

      <section className="container contact-container">

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
          <textarea name="message" rows="5" placeholder="Message" value={formData.message} onChange={handleChange} />

          <button type="submit">Send Message</button>

          {status && <p className="success">{status}</p>}
        </form>

        <div className="contact-info">
          <h2>Contact Info</h2>
          <p>Email: support@learn.co</p>
          <p>Phone: +123 456 7890</p>
          <p>Location: Online Platform</p>
        </div>

      </section>
    </div>
  );
}