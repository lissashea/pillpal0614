import React from 'react';

function DeleteMedication({ medicationId, onDeleteMedication }) {
  const handleDelete = () => {
    onDeleteMedication(medicationId);
  };

  return (
    <div>
      {/* <h3>Delete Medication</h3> */}
      {/* <p>Are you sure you want to delete this medication?</p> */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteMedication;
