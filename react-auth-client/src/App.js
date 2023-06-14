import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './component/SignUp.jsx';
import SignIn from './component/SignIn.jsx';
import GetProfile from './component/GetProfile.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SignUp />
      <SignIn />
      <GetProfile />
    </div>
  );
}

export default App;
