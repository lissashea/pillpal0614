import React, { useState } from 'react';
import "./EditMedicationForm.css";

function EditMedicationForm({ medicationData, onUpdateMedication }) {
  const [medication, setMedication] = useState(medicationData.medication);
  const [dosage, setDosage] = useState(medicationData.dosage);
  const [description, setDescription] = useState(medicationData.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMedicationData = {
      ...medicationData,
      medication: medication,
      dosage: dosage,
      description: description,
    };

    onUpdateMedication(updatedMedicationData);
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
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
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
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="edit-medication-form-input"
            />
          </div>
          <div>
            <label htmlFor="description" className="edit-medication-form-label">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
