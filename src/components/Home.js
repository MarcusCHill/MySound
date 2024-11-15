import React, { useEffect, useState } from 'react';
import { fetchSpotifyData } from '../services/fetchSpotifyData';
import ScrollText from './ScrollText';

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
  console.log(topMonthTracks)

  return (
    <div className='home'>
      <h1 className='title'>My Sound</h1>
      <div className='profile'>
        <div className='homeDataContainer'>
          <div className='profilePictureContainer' style={{ backgroundImage: `url(${userData.images[0]?.url})` }}>
          </div>
          <div className='featureSongs'>
            <h3>GOAT Song:</h3>
            <ScrollText text={topAllTimeTracks.items[0].name} />
            <ScrollText text={topAllTimeTracks.items[0].artists.map((artist) => artist.name).join(', ')}/>
            <h3>6 Month Leader:</h3>
            <ScrollText text={topSixMonthsTracks.items[0].name} />
            <ScrollText text={topSixMonthsTracks.items[0].artists.map((artist) => artist.name).join(', ')}/>
            <h3>Hot Right Now:</h3>
            <ScrollText text={topMonthTracks.items[0].name} />
            <ScrollText text={topMonthTracks.items[0].artists.map((artist) => artist.name).join(', ')}/>
          </div>
        </div>
        <h2 className='userName'>{userData.display_name}</h2>
      </div>
      <section>
        <h2>Top 50: All Time</h2>
        <ul>
          {topAllTimeTracks.items.map((song, index) => (
            <li key={index}>
              {song.name}
              <br/>
              {song.artists.map((artist) => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top 50: Last Six Month</h2>
        <ul>
          {topSixMonthsTracks.items.map((song, index) => (
            <li key={index}>
              {song.name}
              <br/>
              {song.artists.map((artist) => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top 50: Last Month</h2>
        <ul>
          {topMonthTracks.items.map((song, index) => (
            <li key={index}>
              {song.name} 
              <br/>
              {song.artists.map((artist) => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
