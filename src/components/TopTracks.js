import React from "react";
import { Link } from "react-router-dom";
import { useSpotifyData } from "../services/spotifyDataContext.js";

const TopTracks = ({ text, amount }) => {
  const { topTracks, loading, error } = useSpotifyData();
  const currentPath = window.location.pathname;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tracks.</div>;

  let tracks;
  let path = "";

  if (text === " All Time") {
    tracks = topTracks.longTerm;
    path = "all-time";
  } else if (text === " Last Six Months") {
    tracks = topTracks.mediumTerm;
    path = "six-months";
  } else if (text === " Last Month") {
    tracks = topTracks.shortTerm;
    path = "last-month";
  }

  if (!tracks) return null;

  return (
    <section className="trackSection">
      <h2>{`Top Tracks:  ${text}`}</h2>
      <ol>
        {tracks.items.slice(0, amount).map((song, index) => (
          <li key={index}>
            {song.name}
            <br />
            {song.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ol>
      {currentPath !== `/callback/${path}` && <button className="buttonLink">
        <Link to={`${path}`}>{text}</Link>
      </button>}
    </section>
  );
};

export default TopTracks;
