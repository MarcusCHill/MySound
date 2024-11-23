import React from 'react';
import { useSpotifyData } from "../services/spotifyDataContext.js";
import HamburgerNav from '../components/HamburgerNav.js';
import Loading from './Loading.js';
import Error from './Error.js';
import ScrollText from '../components/ScrollText.js';
import TopTracks from '../components/TopTracks.js';


//Home component accepts refreshToken for Error page
//Returns Loading if loading state is true
//Returns Error if error state is true
/*
  Returns:
    the users profile Picture,
    spotify username, 
    top all time track, 
    top last six months track, 
    top track over the last month,
    top 5 all time tracks,
    top 5 last six months tracks,
    top 5 last month tracks.
*/
const Home = ({ refreshToken }) => {  
  //API data and useState retrieved in services/spotifyDataContext
  const { userData, topTracks, loading, error } = useSpotifyData();

  
  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <Error refreshToken={refreshToken}/>
  }

  return (
    <div className='page'>
      <HamburgerNav/>
      <div className='profile'>
        <h1 className='title'>My Sound</h1>
        <div className='homeDataContainer'>
          <div className='profilePictureContainer' style={{ backgroundImage: `url(${userData.images[0]?.url})` }}>
          </div>
          <div className='featureSongs'>
            <h3>GOAT Song:</h3>
            <ScrollText text={topTracks.longTerm.items[0].name} />
            <ScrollText text={topTracks.longTerm.items[0].artists.map((artist) => artist.name).join(', ')}/>
            <h3>6 Month Leader:</h3>
            <ScrollText text={topTracks.mediumTerm.items[0].name} />
            <ScrollText text={topTracks.mediumTerm.items[0].artists.map((artist) => artist.name).join(', ')}/>
            <h3>Hot Right Now:</h3>
            <ScrollText text={topTracks.shortTerm.items[0].name} />
            <ScrollText text={topTracks.shortTerm.items[0].artists.map((artist) => artist.name).join(', ')}/>
          </div>
        </div>
        <h2 className='userName'>{userData.display_name}</h2>
      </div>
      <TopTracks text={' All Time'} amount={5}/>
      <TopTracks text={' Last Six Months'} amount={5}/>
      <TopTracks text={' Last Month'} amount={5}/>
    </div>
  );
};

export default Home;
