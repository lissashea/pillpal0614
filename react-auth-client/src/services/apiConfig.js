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

export function updateMedication(token, medicationId, updatedData) {
  return fetch(`${BASE_URL}/medications/${medicationId}/`, {
    method: 'PUT',
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
