import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../pictures/logo.jpg"

export default function Navbar() {
  return (
      <nav>
        <img src={logo} alt="logo" />
        <h1>Learn.co</h1>

        <div className="linking">
<Link to={"/"}><h3>Home</h3></Link>
<Link to={"/about"}><h3>About</h3></Link>
<Link to={"/courses"}><h3>Courses</h3></Link>
<Link to={"/contact"}><h3>Contact</h3></Link>
<Link to={"/login"}><h3>Login</h3></Link>
{/* <Link to={"/my-courses"}><h3>My Courses</h3></Link> */}
</div>
<button className='signup-btn'><Link to={"/signup"}>Sign up</Link></button>
   </nav>
  )
}


