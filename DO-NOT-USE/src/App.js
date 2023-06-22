import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import Nav from "./component/Nav.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import GetProfile from "./component/GetProfile.jsx";
import SignOut from "./component/SignOut.jsx";
import Home from "./component/Home.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <div className="App">
      <Header />
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn onSignIn={() => setIsLoggedIn(true)} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<GetProfile />} />
        <Route
          path="/sign-out"
          element={<SignOut onSignOut={() => setIsLoggedIn(false)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
