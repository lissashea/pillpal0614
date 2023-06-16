import React, { useState } from 'react';
import "./EditMedicationForm.css";

function EditMedicationForm({ medication, onUpdateMedication }) {
  const [updatedMedication, setUpdatedMedication] = useState(medication);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateMedication(medication.id, updatedMedication);
  };

  return (
    <div className="edit-medication-form-container">
      <h2 className="edit-medication-form-title">Edit Medication</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medication" className="edit-medication-form-label">
            Medication:
          </label>
          <input
            type="text"
            id="medication"
            value={updatedMedication.medication}
            onChange={(e) =>
              setUpdatedMedication({
                ...updatedMedication,
                medication: e.target.value
              })
            }
            className="edit-medication-form-input"
          />
        </div>
        <div>
          <label htmlFor="dosage" className="edit-medication-form-label">
            Dosage:
          </label>
          <input
            type="text"
            id="dosage"
            value={updatedMedication.dosage}
            onChange={(e) =>
              setUpdatedMedication({
                ...updatedMedication,
                dosage: e.target.value
              })
            }
            className="edit-medication-form-input"
          />
        </div>
        <div>
          <label htmlFor="description" className="edit-medication-form-label">
            Description:
          </label>
          <textarea
            id="description"
            value={updatedMedication.description}
            onChange={(e) =>
              setUpdatedMedication({
                ...updatedMedication,
                description: e.target.value
              })
            }
            className="edit-medication-form-textarea"
          />
        </div>
        <button type="submit" className="edit-medication-form-button">
          Update Medication
        </button>
      </form>
    </div>
  );
}

export default EditMedicationForm;
