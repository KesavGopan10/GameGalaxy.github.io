import React from "react";
import "./Navbar.css";
// import Sidebar from "./Sidebar";
const Navbar = () => {
  return (
    <>
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/signin">Sign In</a>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </nav>
    {/* <Sidebar /> */}

    </>
  );
};

export default Navbar;
