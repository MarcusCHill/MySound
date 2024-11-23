import React from "react";
import { Link } from "react-router-dom";
import { useSpotifyData } from "../services/spotifyDataContext.js";

//TopTracks accepts text and amount
//Returns a section with a title defined through 'text' and an ordered list that maps the defined 'amount' of a users top tracks
const TopTracks = ({ text, amount }) => {
  const { topTracks } = useSpotifyData();
  //use the current path to determin the to field within the Link
  //If currentPath is not one of the predefined routes (all-time, six-months or last-month) then the button will render and provide the corresponding path
  const currentPath = window.location.pathname;

  let tracks;
  let path = "";

  //So the component is reusable we load the correct tracks and path for button based on the provided text argument
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
      {currentPath !== `/callback/${path}` && 
        <button className="buttonLink">
          <Link to={`${path}`}>{text}</Link>
        </button>
      }
    </section>
  );
};

export default TopTracks;
