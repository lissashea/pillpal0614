import React, { useState } from 'react';
import "./GetProfile.css";

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
    <div>
      <h2>Add Medication</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medication:</label>
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>
        <div>
          <label>Dosage:</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
}

export default AddMedicationForm;
