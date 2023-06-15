import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicationForm from "./AddMedicationForm.jsx";
import EditMedicationForm from "./EditMedicationForm.jsx";
import {
  fetchProfileData,
  addMedication,
  updateMedication,
} from "../services/apiConfig.js";
import "./GetProfile.css";

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching profile data...");

    fetchProfileData(token)
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
    if (token) {
      localStorage.setItem("token", token);
    }
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
    addMedication(token, data)
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
    updateMedication(token, medicationId, { taken: !taken })
      .then((data) => {
        setProfileData(updatedProfileData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditMedication = (medicationId, updatedMedication) => {
    const updatedProfileData = profileData.map((medication) => {
      if (medication.id === medicationId) {
        return { ...medication, ...updatedMedication };
      }
      return medication;
    });

    setProfileData(updatedProfileData);

    // Send updated data to the server (you can adjust this part based on your API)
    updateMedication(token, medicationId, updatedMedication)
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
                        <button
                          onClick={() => {
                            setSelectedMedication(medication);
                            setEditMode(true);
                          }}
                        >
                          Edit
                        </button>
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
        {editMode && (
          <EditMedicationForm
            medicationId={selectedMedication.id}
            medication={selectedMedication}
            onEditMedication={handleEditMedication}
          />
        )}
      </div>
    </div>
  );
}  
export default GetProfile;
