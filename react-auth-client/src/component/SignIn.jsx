import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/apiConfig.js";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signInData = {
      email: email,
      password: password,
    };

    console.log("Sending sign-in request...");

    try {
      const { token, user_id } = await signIn(signInData);
      localStorage.setItem("token", token);
      onSignIn({ id: user_id, username: signInData.email }); // Pass the user data to the callback
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
