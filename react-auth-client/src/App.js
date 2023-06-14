import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import GetProfile from "./component/GetProfile.jsx";
import SignOut from "./component/SignOut.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/profile" element={<GetProfile />} />
      </Routes>
    </div>
  );
}

export default App;
