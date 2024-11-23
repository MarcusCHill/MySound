import React from "react";
import HamburgerNav from "../components/HamburgerNav";
import TopTracks from "../components/TopTracks";
import { useSpotifyData } from "../services/spotifyDataContext";
import Loading from "./Loading";
import Error from "./Error";

//All Time Route/page accepts refreshToken for Error Page
//Returns Loading if loading state is true
//Returns Error if Error state is true
//Returns the top 50 tracks through TopTracks component
const AllTime = ({ refreshToken }) => {

    const { loading, error } = useSpotifyData();

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <Error refreshToken={refreshToken}/>
    }

    return (
        <div className="page">  
            <HamburgerNav/>
            <h1 className="title">My Sound</h1>
            <TopTracks text={' All Time'}amount={50}/>
        </div>
    )
}

export default AllTime;