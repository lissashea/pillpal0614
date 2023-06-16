import React from 'react';

function DeleteMedication({ medication, onDeleteMedication }) {
  const handleDelete = () => {
    onDeleteMedication(medication.id);
  };

  return (
    <div>
      <h3>Delete Medication</h3>
      <p>Are you sure you want to delete {medication.medication}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteMedication;
