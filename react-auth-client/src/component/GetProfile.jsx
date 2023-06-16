import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicationForm from "./AddMedicationForm.jsx";
import EditMedicationForm from "./EditMedicationForm.jsx";
import DeleteMedication from "./DeleteMedication.jsx";
import {
  fetchProfileData,
  addMedication,
  updateMedication,
  deleteMedication, // Import the deleteMedication API function
} from "../services/apiConfig.js";
import "./GetProfile.css";

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false); // Add deleteMode state
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
        setAddMode(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTakenChange = (medicationId, taken) => {
    const updatedProfileData = profileData.map((medication) => {
      if (medication.id === medicationId) {
        return { ...medication, taken: !taken };
      }
      return medication;
    });

    setProfileData(updatedProfileData);

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

    updateMedication(token, medicationId, updatedMedication)
      .then((data) => {
        setProfileData(updatedProfileData);
        setUpdateSuccess(true);
        setTimeout(() => {
          setEditMode(false);
          setUpdateSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteMedication = (medicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medication?"
    );
    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const medicationExists = profileData.find(
      (medication) => medication.id === medicationId
    );
    if (!medicationExists) {
      console.error("Medication not found.");
      return;
    }

    deleteMedication(token, medicationId)
      .then(() => {
        console.log("Medication deleted successfully!");
        // Remove the deleted medication from the profileData state
        const updatedProfileData = profileData.filter(
          (medication) => medication.id !== medicationId
        );
        setProfileData(updatedProfileData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="profile-container">
      {profileData ? (
        <div className="profile-data">
          <h2 className="profile-title">
            {profileData[0]?.username}'s Profile
          </h2>
          <div className="profile-column">
            <div className="medication-list">
              {Array.isArray(profileData) && profileData.length > 0 ? (
                <table className="profile-table">
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Description</th>
                      <th>Taken</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.map((medication) => (
                      <tr
                        key={medication.id}
                        className={medication.taken ? "medication-taken" : ""}
                      >
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
                        <td>
                          <button
                            onClick={() => {
                              setSelectedMedication(medication);
                              setEditMode(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setSelectedMedication(medication);
                              setDeleteMode(true);
                            }}
                          >
                            Delete
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
            <div className="add-medication-form">
              {!editMode && !addMode && (
                <button onClick={() => setAddMode(true)}>Add</button>
              )}
              {addMode && (
                <AddMedicationForm
                  onAddMedication={handleAddMedication}
                  onCancel={() => setAddMode(false)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
      {editMode && (
        <>
          <EditMedicationForm
            medication={selectedMedication}
            onUpdateMedication={handleEditMedication}
          />
          {updateSuccess && (
            <p className="update-success-message">
              Medication updated successfully!
            </p>
          )}
        </>
      )}
      {deleteMode && (
        <DeleteMedication
          medication={selectedMedication}
          onDeleteMedication={handleDeleteMedication}
        />
      )}
    </div>
  );
}

export default GetProfile;
