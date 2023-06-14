import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;