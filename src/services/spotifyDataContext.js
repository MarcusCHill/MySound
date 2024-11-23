import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSpotifyData } from "../services/fetchSpotifyData";

const SpotifyDataContext = createContext();

export const SpotifyDataProvider = ({ children, accessToken }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState({
    longTerm: null,
    mediumTerm: null,
    shortTerm: null,
  });

  useEffect(() => {
    console.log(accessToken)
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
