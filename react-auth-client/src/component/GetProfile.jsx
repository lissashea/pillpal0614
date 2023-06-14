import React, { useEffect, useState } from 'react';

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    if (!token) {
      console.error('Error: No token');
      return;
    }

    console.log('Fetching profile data...');
    fetch('http://localhost:8000/api/profile/', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the JWT token to the request header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [token]);

  return (
    <div>
      {profileData ? (
        <div>
          <h2>Profile Data:</h2>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default GetProfile;
