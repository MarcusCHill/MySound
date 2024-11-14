import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ accessToken }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from Spotify API
  useEffect(() => {
    if (accessToken) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h2>User Data from Spotify</h2>
      <ul>
        <li><strong>Name:</strong> {userData.display_name}</li>
        <li><strong>Email:</strong> {userData.email}</li>
        <li><strong>Followers:</strong> {userData.followers.total}</li>
        <li><strong>Country:</strong> {userData.country}</li>
        <li><strong>Profile Image:</strong> <img src={userData.images[0]?.url} alt="Profile" width="50" height="50" /></li>
      </ul>
    </div>
  );
};

export default Home;
