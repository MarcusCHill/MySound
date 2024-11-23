import React from 'react';
import { useSpotifyData } from "../services/spotifyDataContext.js";
import HamburgerNav from './HamburgerNav';
import Loading from './Loading';
import Error from './Error.js';
import ScrollText from './ScrollText';
import TopTracks from './TopTracks';

const Home = ({ refreshToken }) => {  
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
