import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSpotifyData } from "../services/fetchSpotifyData";

//Create context to hold specified values to be shared across components/routes
const SpotifyDataContext = createContext();

//Spotify Data Provider is a wrapper component that accepts accessToken retrieved in Spotify.js
//API get requests are used to set the provider with data used across children components
export const SpotifyDataProvider = ({ children, accessToken }) => {
  //useState for loading, error, userData, topTracks variables and setter functions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState({
    longTerm: null,
    mediumTerm: null,
    shortTerm: null,
  });

  //useEffect hook to trigger fetchData when component mounts and when accessToken changes. 
  //While fetching data loading is true, If there is an error we setError to true
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          setLoading(true);

          //user data
          const userDataResponse = await fetchSpotifyData(accessToken, "me");
          setUserData(userDataResponse);

          //top tracks
          const longTerm = await fetchSpotifyData(accessToken, "me/top/tracks?limit=50&time_range=long_term");
          const mediumTerm = await fetchSpotifyData(accessToken,"me/top/tracks?limit=50&time_range=medium_term");
          const shortTerm = await fetchSpotifyData(accessToken, "me/top/tracks?limit=50&time_range=short_term");

          setTopTracks({ longTerm, mediumTerm, shortTerm });
          setError(null)
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  //values passed to the context provider
  const value = {
    loading,
    error,
    userData,
    topTracks,
  };

  return (
    <SpotifyDataContext.Provider value={value}>
      {children}
    </SpotifyDataContext.Provider>
  );
};

export const useSpotifyData = () => {
  return useContext(SpotifyDataContext);
};
