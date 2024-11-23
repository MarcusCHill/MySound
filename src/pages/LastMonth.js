import React from "react";
import HamburgerNav from "../components/HamburgerNav";
import { useSpotifyData } from "../services/spotifyDataContext";
import Loading from "./Loading";
import Error from "./Error";
import TopTracks from "../components/TopTracks";

//Last Month Route/page accepts refreshToken for Error Page
//Returns Loading if loading state is true
//Returns Error if Error state is true
//Returns the top 50 tracks within the last month through TopTracks component
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