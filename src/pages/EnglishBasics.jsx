import React from "react";
import courseImg from "../pictures/course1.jpg"; // your image

export default function EnglishBasics() {
  return (
    <div className="course-page">

      {/* HERO */}
      <section className="course-hero">
        <img src={courseImg} alt="English Basics" />
        <div className="course-info">
          <h1>English Basics</h1>
          <p>
            Learn the fundamentals of English including grammar, vocabulary,
            and communication skills. Perfect for beginners starting their journey.
          </p>

          <div className="course-meta">
            <span>⭐ 4.5</span>
            <span>Beginner Level</span>
            <span>10 Lessons</span>
          </div>

          <button>Enroll Now</button>
        </div>
      </section>

      {/* COURSE CONTENT */}
      <section className="course-content">
        <h2>Course Content</h2>

        <ul>
          <li>Introduction to English</li>
          <li>Basic Grammar Rules</li>
          <li>Common Vocabulary</li>
          <li>Sentence Formation</li>
          <li>Basic Conversations</li>
          <li>Listening Practice</li>
          <li>Reading Skills</li>
          <li>Writing Basics</li>
          <li>Pronunciation Tips</li>
          <li>Final Practice</li>
        </ul>
      </section>

      {/* INSTRUCTOR */}
      <section className="instructor">
        <h2>Instructor</h2>
        <p><strong>John Doe</strong></p>
        <p>Experienced English teacher with 10+ years of teaching beginners.</p>
      </section>

    </div>
  );
}