import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import GetProfile from "./component/GetProfile.jsx";
import SignOut from "./component/SignOut.jsx";

function App() {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<GetProfile />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </div>
  );
}

export default App;
