import React from 'react';
import ig from "../pictures/ig.png";
import fb from "../pictures/fb.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-search">
          <input type="search" placeholder="Search..." />
          <button>Go</button>
        </div>

        <div className="icons">
          <img src={ig} alt="Instagram" />
          <img src={fb} alt="Facebook" />
        </div>

        <p className="copyright">
          © 2026 Learn.co
        </p>

      </div>
    </footer>
  );
}