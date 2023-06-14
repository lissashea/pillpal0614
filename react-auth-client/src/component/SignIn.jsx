import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSignIn = () => {
    const signInData = {
      email: email,
      password: password
    };

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signInData)
    })
      .then(res => res.json())
      .then(data => {
        const { token, message } = data;
        setWelcomeMessage(message);
        localStorage.setItem('token', token);
        // Redirect to the profile page or perform other actions
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {welcomeMessage && <p>{welcomeMessage}</p>}
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
}

export default SignIn;
