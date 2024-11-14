import React, { useEffect, useState } from 'react';
import Home from '../components/Home';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_REDIRECT_URI;
const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const scope = 'user-read-private user-read-email user-top-read';

const Spotify = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

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
    const refreshToken = localStorage.getItem('refresh_token');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      setAccessToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('expires_in', data.expires_in);
    }
  };

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
    <div>
      {!accessToken ? (
        <button onClick={redirectToSpotifyAuthorize}>Log in with Spotify</button>
      ) : (
        <div>
          <Home accessToken={accessToken} />
          <button onClick={refreshToken}>Refresh Token</button>
        </div>
      )}
    </div>
  );
};

export default Spotify;
