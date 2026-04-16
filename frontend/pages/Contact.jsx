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
  "https://satisfied-adaptation-production-cf47.up.railway.app/api/contact/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }
);
    const data = await response.json();

    if (response.ok) {
      setStatus("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } else {
      setStatus(data.message);
    }

  } catch (error) {
    setStatus("Server error");
  }
}



  return (
    <div className="contact">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Get in touch with us!</p>
      </section>

      {/* MAIN SECTION */}
      <section className="contact-container">

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>

          {status && <p className="status">{status}</p>}
        </form>

        {/* CONTACT INFO */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>📧 Email: support@learn.co</p>
          <p>📞 Phone: +123 456 7890</p>
          <p>📍 Location: Online Platform</p>
        </div>

      </section>

    </div>
  );
}