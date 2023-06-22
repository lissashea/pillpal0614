import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/apiConfig.js";

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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serializedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    };

    signUp(serializedData)
      .then((data) => {
        navigate("/signin"); // Navigate to the sign-in page ("/signin")
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
