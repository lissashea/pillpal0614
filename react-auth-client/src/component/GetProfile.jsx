import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicationForm from "./AddMedicationForm.jsx";
import "./GetProfile.css";

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching profile data...");

    fetch("http://localhost:8000/api/profile/?cache=" + Date.now(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile data received:", data);
        setProfileData(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate, setProfileData, setIsLoggedIn, token]);

  useEffect(() => {
    if (token && username) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    }
  }, [token, username]);

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
      .then((response) => response.json())
      .then((responseData) => {
        setProfileData((prevData) => [...prevData, responseData]);
        console.log("Medication added successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTakenChange = (medicationId, taken) => {
    // Update the taken property for the selected medication
    const updatedProfileData = profileData.map((medication) => {
      if (medication.id === medicationId) {
        return { ...medication, taken: !taken };
      }
      return medication;
    });

    setProfileData(updatedProfileData);

    // Send updated data to the server (you can adjust this part based on your API)
    fetch(`http://localhost:8000/api/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taken: !taken }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(updatedProfileData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="profile-container">
        {profileData ? (
          <div className="profile-data">
            <h2 className="profile-title">
              {profileData[0]?.username}'s Profile
            </h2>
            {Array.isArray(profileData) && profileData.length > 0 ? (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Description</th>
                    <th>Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {profileData.map((medication) => (
                    <tr key={medication.id}>
                      <td>{medication.medication}</td>
                      <td>{medication.dosage}</td>
                      <td>{medication.description}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={medication.taken}
                          onChange={() =>
                            handleTakenChange(medication.id, medication.taken)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No medication data available.</p>
            )}
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
