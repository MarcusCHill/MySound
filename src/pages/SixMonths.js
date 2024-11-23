import React from "react";
import { useSpotifyData } from "../services/spotifyDataContext";
import HamburgerNav from "../components/HamburgerNav";
import Loading from "./Loading";
import Error from "./Error";
import TopTracks from "../components/TopTracks";

//Six Months Route/page accepts refreshToken for Error Page
//Returns Loading if loading state is true
//Returns Error if Error state is true
//Returns the top 50 tracks within the last six months through TopTracks component
const SixMonths = ({ refreshToken }) => {

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
            <TopTracks text={' Last Six Months'}amount={50}/>
        </div>
    )
}

export default SixMonths;