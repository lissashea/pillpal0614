import React, { useEffect, useState } from "react";
import AddMedicationForm from "./AddMedicationForm.jsx";

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [token]);

  const handleAddMedication = (medicationData) => {
    let userId = null;
    if (profileData && profileData.length > 0) {
      if (profileData[0].user) {
        userId = profileData[0].user.id;
      } else if (profileData[0].user_id) {
        userId = profileData[0].user_id;
      }
    }
  
    const data = {
      ...medicationData,
      user: userId,
    };
  
    // Make a POST request to add the medication
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
        // Update the profile data after adding the medication
        setProfileData((prevData) => [...prevData, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
    
  return (
    <div>
      {profileData ? (
        <div>
          <h2>Profile Data:</h2>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}

      <AddMedicationForm onAddMedication={handleAddMedication} />
    </div>
  );
}

export default GetProfile;
