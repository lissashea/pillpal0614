import React, { useState, useEffect } from "react";
import logo from "../logo_img.png";
import "./Header.css";

function Header() {
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
      <div className="time-container">
        <span className="current-time">{currentTime}</span>
      </div>
    </header>
  );
}

export default Header;
