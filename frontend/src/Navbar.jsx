import React from "react";
import { Link } from "react-router-dom";
import logo from "../pictures/logo.jpg";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload(); // refresh UI after logout
  }

  return (
    <nav>
      <img src={logo} alt="logo" />
      <h1>Learn.co</h1>

      <div className="linking">

        <Link to={"/"}><h3>Home</h3></Link>
        <Link to={"/about"}><h3>About</h3></Link>
        <Link to={"/courses"}><h3>Courses</h3></Link>
        <Link to={"/contact"}><h3>Contact</h3></Link>

        {/* 🔥 LOGIN ONLY IF NOT LOGGED IN */}
        {!user && (
          <Link to={"/login"}><h3>Login</h3></Link>
        )}

        {/* 🔥 MY COURSES ONLY IF LOGGED IN */}
        {user && (
          <Link to={"/my-courses"}><h3>My Courses</h3></Link>
        )}

      </div>

      {/* SIGNUP OR LOGOUT */}
      {!user ? (
        <button className='signup-btn'>
          <Link to={"/signup"}>Sign up</Link>
        </button>
      ) : (
        <button className='signup-btn' onClick={handleLogout}>
          Logout
        </button>
      )}

    </nav>
  );
}