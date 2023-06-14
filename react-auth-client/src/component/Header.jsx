import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo_img.png";
import "./Header.css";

function Header({ isLoggedIn }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/New_York",
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <nav>
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/sign-out" className="nav-link">
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-in" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="nav-link">
                  About Us
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="time-container">
        <span className="current-time">{currentTime}</span>
      </div>
    </header>
  );
}

export default Header;
