import React, { useState } from "react";

const TopTracks = ({ text, timeframe, amount }) => {
    const [topFifty, setTopFifty] = useState(false)

    const newAmount = topFifty ? 50 : amount;


    return(
        <>
            <section className='trackSection'>
                <h2>{`Top Tracks:  ${text}`}</h2>
                <ol>
                {timeframe.items.slice(0, newAmount).map((song, index) => (
                    <li key={index}>
                    {song.name}                        
                    <br/>
                    {song.artists.map((artist) => artist.name).join(', ')}
                    </li>
                ))}
                </ol>
                <button onClick={() => setTopFifty(!topFifty)}> {topFifty ? 'Close' : 'See Top 50'} </button>
            </section>
        </>
    )
}

export default TopTracks;