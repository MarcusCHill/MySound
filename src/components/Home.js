import React, { useEffect, useState } from 'react';
import { fetchSpotifyData } from '../services/fetchSpotifyData';
import Loading from './Loading'
import ScrollText from './ScrollText';
import TopTracks from './TopTracks';

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
    return <Loading/>;
  }

  if (error) {
    return <h1>Error fetching spotify data.</h1>;
  }

  return (
    <div className='home'>
      <div className='profile'>
        <h1 className='title'>My Sound</h1>
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
      <TopTracks text={' All Time'} timeframe={topAllTimeTracks} amount={5} full={false}/>
      <TopTracks text={' Last Six Months'} timeframe={topSixMonthsTracks} amount={5} full={false}/>
      <TopTracks text={' Last Month'} timeframe={topMonthTracks} amount={5} full={false}/>
    </div>
  );
};

export default Home;
