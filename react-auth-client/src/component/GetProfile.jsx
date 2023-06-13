import React, { useEffect, useState } from 'react';

function GetProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log('Fetching profile data...');
    fetch('http://localhost:8000/api/medication-list/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the JWT token from local storage
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
