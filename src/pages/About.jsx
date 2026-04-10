import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
   <div className="about">

      {/* HERO */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          We are dedicated to helping students learn, grow, and succeed through
          accessible and high-quality online education.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make learning simple, flexible, and available to everyone.
          We believe education should empower individuals to achieve their goals
          and unlock their full potential.
        </p>
      </section>

      {/* WHAT WE OFFER */}
      <section className="about-section">
        <h2>What We Offer</h2>

        <div className="about-cards">
          <div className="about-card">
            <h3>📚 Quality Courses</h3>
            <p>Learn from well-structured and easy-to-follow lessons.</p>
          </div>

          <div className="about-card">
            <h3>🎓 Expert Instructors</h3>
            <p>Gain knowledge from experienced professionals.</p>
          </div>

          <div className="about-card">
            <h3>⏰ Flexible Learning</h3>
            <p>Study anytime at your own pace.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Start Your Learning Journey Today</h2>
        <button><Link to={"/courses"}>Explore Courses</Link></button>
      </section>

    </div>

  )
}


