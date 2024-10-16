import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get token from session storage

    if (token) {
      axios
        .get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with Authorization header
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          setError('Failed to fetch user data');
          console.error(error);
        });
    }
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {userData ? (
        <div className="w-full max-w-lg p-6 border-2 border-red-700 rounded-lg bg-black text-red-700">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p className="mb-2">Name: <span className="text-white">{userData.name}</span></p>
          <p className="mb-2">Email: <span className="text-white">{userData.email}</span></p>
          <p className="mb-2">Role: <span className="text-white">{userData.role}</span></p>
          {userData.image && (
            <div className="mt-4">
              <img
                src={`data:image/jpeg;base64,${userData.image}`}
                alt="User Profile"
                className="rounded-full border-2 border-red-700"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-700">Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
