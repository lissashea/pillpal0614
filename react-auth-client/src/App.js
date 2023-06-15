import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import GetProfile from "./component/GetProfile.jsx";
import SignOut from "./component/SignOut.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<GetProfile />} />
        <Route
          path="/sign-out"
          element={<SignOut onSignOut={handleSignOut} />}
        />
      </Routes>
    </div>
  );
}

export default App;
