import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../components/Login';
import Guest from '../components/Guest'
import Home from '../components/Home';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_REDIRECT_URI;
const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const scope = 'user-read-private user-read-email user-top-read';

const Spotify = () => {
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
       setRefreshed((previous) => previous + 1)
     }
   }

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
    <>
      {!accessToken ? (
        <Routes>
          <Route path='/' element={<Login autorize={redirectToSpotifyAuthorize}/>} />
          <Route path='/guest' element={<Guest/>} />
        </Routes>
    
      ) : (
        <Routes>
          <Route path="/callback" element={<Home accessToken={accessToken}/>} />
        </Routes>
      )}
    </>
  );
};

export default Spotify;
