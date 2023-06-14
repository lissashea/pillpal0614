import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicationForm from "./AddMedicationForm.jsx";
import Header from "./Header.jsx";
import "./GetProfile.css";

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("Error: No token");
      return;
    }
    console.log("Fetching profile data...");
    fetch("http://localhost:8000/api/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile data received:", data);
        setProfileData(data);
        setIsLoggedIn(true);

        // Update the condition to check for the appropriate data structure
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          data[0].user &&
          data[0].user.username
        ) {
          setUsername(data[0].user.username);
        } else {
          console.log("Invalid data structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [token]);

  const handleAddMedication = (medicationData) => {
    let userId = null;
    if (profileData && profileData.user && profileData.user.id) {
      userId = profileData.user.id;
    }

    const data = {
      ...medicationData,
      user: userId,
    };

    fetch("http://localhost:8000/api/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData((prevData) => ({ ...prevData, data }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="profile-container">
        {profileData ? (
          <div>
            <h2 className="profile-title">
              {profileData[0]?.username}'s Profile
            </h2>
            <pre>{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}

        <AddMedicationForm onAddMedication={handleAddMedication} />
      </div>
    </div>
  );
}

export default GetProfile;
