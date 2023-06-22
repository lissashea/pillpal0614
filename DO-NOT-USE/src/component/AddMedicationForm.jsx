import React, { useState } from 'react';
import "./AddMedicationForm.css";

function AddMedicationForm({ onAddMedication }) {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const medicationData = {
      medication: medication,
      dosage: dosage,
      description: description,
      taken: false,
    };

    onAddMedication(medicationData);

    // Reset the form fields
    setMedication('');
    setDosage('');
    setDescription('');
  };

  return (
      <div className="add-medication-form-container">
        <h2 className="add-medication-form-title">Add Medication</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="medication" className="add-medication-form-label">
              Medication:
            </label>
            <input
              type="text"
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="add-medication-form-input"
            />
          </div>
          <div>
            <label htmlFor="dosage" className="add-medication-form-label">
              Dosage:
            </label>
            <input
              type="text"
              id="dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="add-medication-form-input"
            />
          </div>
          <div>
            <label htmlFor="description" className="add-medication-form-label">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="add-medication-form-textarea"
            />
          </div>
          <button type="submit" className="add-medication-form-button">
            Add Medication
          </button>
        </form>
      </div>
    );
}

export default AddMedicationForm;