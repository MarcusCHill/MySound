import React from "react";
import HamburgerNav from "./HamburgerNav";
import { useSpotifyData } from "../services/spotifyDataContext";
import Loading from "./Loading";
import Error from "./Error";
import TopTracks from "./TopTracks";

const LastMonth = ({ refreshToken }) => {

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
            <TopTracks text={' Last Month'} amount={50}/>
        </div>
    )
}

export default LastMonth;