import React from "react";
import HamburgerNav from "./HamburgerNav";
import TopTracks from "./TopTracks";

const AllTime = () => {
    return (
        <div className="page">  
            <HamburgerNav/>
            <h1 className="title">My Sound</h1>
            <TopTracks text={' All Time'}amount={50}/>
        </div>
    )
}

export default AllTime;