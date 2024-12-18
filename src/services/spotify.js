import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { SpotifyDataProvider } from "./spotifyDataContext.js";
import Login from '../pages/Login.js';
import Home from '../pages/Home.js';
import AllTime from '../pages/AllTime.js';
import SixMonths from '../pages/SixMonths.js';
import LastMonth from '../pages/LastMonth.js';

//prepare clientId and redirectUrl for Spotify API Authorization code PKCE
// No usage of Client Secret due to Spotify offering PKCE Authorization
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_REDIRECT_URI;
const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const scope = 'user-read-private user-read-email user-top-read';

//Spotify Component returns SpotifyDataProvider and conditionally rendered Routes based on accessToken boolean 
/***
  
  *Part of this code is derived from spotify documentation and Spotify GitHub WebAPI Examples! 

  https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
  https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code_pkce/public/app.js

***/

const Spotify = () => {
  //useState for accessToken and refreshed. accessToken used for autorization in API request, refreshed used for monitoring the expiry state of the refresh/accessToken
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshed, setRefreshed] = useState(0)

  useEffect(() => {
    // Check if code is in the URL (callback from Spotify)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !accessToken) {
      getToken(code); // If code is present and no token yet, exchange code for token
    }
  }, [accessToken]);

  const redirectToSpotifyAuthorize = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);

    const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=${scope}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location.href = authUrl;
  };

  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      setAccessToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('expires_in', data.expires_in);

      // Clear code from URL for cleanliness
      window.history.replaceState({}, document.title, redirectUrl);
    }
  };

  const refreshToken = async () => {

    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: clientId
       }),
     }
     const body = await fetch(tokenEndpoint, payload);
     const response = await body.json();
 
     localStorage.setItem('access_token', response.access_token);
     setAccessToken(localStorage.getItem('access_token'))
     if (response.refresh_token) {
       localStorage.setItem('refresh_token', response.refresh_token);
       //increment refreshed state to reset timeout in useEffect
       setRefreshed((previous) => previous + 1)
     }
   }
  
  //use Effect to refresh the refresh token one minute before it expires
  useEffect(() => {
    const expires_in = localStorage.getItem('expires_in')
    if (expires_in) {
      const timeout = setTimeout (() => {
        refreshToken();
      }, (expires_in - 60) * 1000);

      return () => clearTimeout(timeout)
    }
  }, [refreshed])

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((x) => possible[x % possible.length])
      .join('');
  };

  const generateCodeChallenge = async (verifier) => {
    const data = new TextEncoder().encode(verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  return (
    <SpotifyDataProvider accessToken={accessToken} refreshToken={refreshToken}>
      <Routes>
        {!accessToken ? (
          <>
            <Route path='/' element={<Login autorize={redirectToSpotifyAuthorize}/>} />    
          </>
        ) : (
          <>
            <Route path='/' element={<Login autorize={redirectToSpotifyAuthorize}/>} />
            <Route path="/callback" element={<Home refreshToken={refreshToken}/>} />
            <Route path="/callback/all-time" element={<AllTime refreshToken={refreshToken}/>} />
            <Route path="/callback/six-months" element={<SixMonths refreshToken={refreshToken}/>} />
            <Route path="/callback/last-month" element={<LastMonth refreshToken={refreshToken}/>} />
          </>
        )}
      </Routes>
    </SpotifyDataProvider>
  );
};

export default Spotify;
