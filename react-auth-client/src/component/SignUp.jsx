import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const navigate = useNavigate;

    const serializedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    };

    fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serializedData),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/profile"); // Navigate to the sign-in page ("/")
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Reset form data
    setFormData({
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <div>
      <Header isLoggedIn={false} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
