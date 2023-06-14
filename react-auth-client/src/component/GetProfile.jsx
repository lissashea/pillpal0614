import React, { useEffect, useState } from 'react';

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    console.log('Fetching profile data...');
    fetch(`http://localhost:8000/api/medication-list/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  return (
    <div>
      {profileData ? (
        <div>
          <h2>Profile Data: SIGNED IN</h2>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default GetProfile;
