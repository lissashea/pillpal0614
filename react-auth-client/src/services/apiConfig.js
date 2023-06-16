const BASE_URL = "http://localhost:8000/api";

export async function fetchProfileData(token) {
  const response = await fetch(`${BASE_URL}/profile/?cache=${Date.now()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function addMedication(token, medicationData) {
  const response = await fetch(`${BASE_URL}/profile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(medicationData),
  });
  const responseData = await response.json();
  return responseData;
}

export async  function updateMedication(token, medicationId, updatedData) {
  return fetch(`${BASE_URL}/medications/${medicationId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  })
  .then((response) => response.json())
  .catch((error) => {
    throw new Error(error.message);
  });
}

export async  function deleteMedication(token, medicationId) {
  return fetch(`${BASE_URL}/medications/${medicationId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error('Medication not found');
      } else {
        throw new Error('Failed to delete medication');
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
