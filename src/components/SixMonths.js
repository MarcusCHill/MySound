import React from "react";
import { useSpotifyData } from "../services/spotifyDataContext";
import HamburgerNav from "./HamburgerNav";
import Loading from "./Loading";
import Error from "./Error";
import TopTracks from "./TopTracks";

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