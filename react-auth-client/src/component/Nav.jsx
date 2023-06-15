import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav({ isLoggedIn }) {
  return (
    <nav>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li>
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav-link" activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-out" className="nav-link" activeClassName="active">
                Sign Out
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/sign-in" className="nav-link" activeClassName="active">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" className="nav-link" activeClassName="active">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="nav-link" activeClassName="active">
                About Us
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
