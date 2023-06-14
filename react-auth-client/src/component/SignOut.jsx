import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the token and user id from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    // Navigate to the sign-in page
    navigate('/');
  };

  return (
    <div>
      <Header isLoggedIn={true} />
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
