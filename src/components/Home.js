import React, { useEffect, useState } from 'react';
import { fetchSpotifyData } from '../services/fetchSpotifyData';

const Home = ({ accessToken }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null);
  const [topAllTimeTracks, setTopAllTimeTrakts] = useState(null);
  const [topSixMonthsTracks, setTopSixMonthsTracks] = useState(null);
  const [topMonthTracks, setTopMonthTracks] = useState(null);

  // Fetch user data and top tracks from Spotify API
  useEffect(() => {

    const fetchData = async () => {
      if (accessToken) {
        try{
          const userDataResponse = await fetchSpotifyData(accessToken, 'me')
          setUserData(userDataResponse)

          const TATResponse = await fetchSpotifyData(accessToken, 'me/top/tracks?limit=50&time_range=long_term')
          setTopAllTimeTrakts(TATResponse)

          const TSMResponse = await fetchSpotifyData(accessToken, 'me/top/tracks?limit=50&time_range=medium_term')
          setTopSixMonthsTracks(TSMResponse)

          const TMResponse = await fetchSpotifyData(accessToken, 'me/top/tracks?limit=50&time_range=short_term')
          setTopMonthTracks(TMResponse)

          setLoading(false)
        } catch (error){
          setLoading(false)
          setError(error)
        }
      }
    }

    fetchData();

  }, [accessToken]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h1>Error fetching spotify data.</h1>;
  }

  return (
    <div>
      <h1>My Sound</h1>
      <div>
        <div>
          <img src={userData.images[0]?.url} alt="Profile" width="50" height="50" />
          <div>
            <h3>GOAT Song:</h3>
            <h4>{topAllTimeTracks.items[0].name} - {topAllTimeTracks.items[0].album.name}</h4>
            <h3>6 Month Leader:</h3>
            <h4>{topSixMonthsTracks.items[0].name} - {topSixMonthsTracks.items[0].album.name}</h4>
            <h3>Hot Right Now:</h3>
            <h4>{topMonthTracks.items[0].name} - {topMonthTracks.items[0].album.name}</h4>
          </div>
        </div>
        <h2>{userData.display_name}</h2>
      </div>
      <section>
        <h2>Top 50: All Time</h2>
        <ul>
          {topAllTimeTracks.items.map((song, index) => (
            <li key={index}>
              {song.name} - {song.album.name}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top 50: Last Six Month</h2>
        <ul>
          {topSixMonthsTracks.items.map((song, index) => (
            <li key={index}>
              {song.name} - {song.album.name}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top 50: Last Month</h2>
        <ul>
          {topMonthTracks.items.map((song, index) => (
            <li key={index}>
              {song.name} - {song.album.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
