import React from "react";
import HamburgerNav from "./HamburgerNav";
import TopTracks from "./TopTracks";

const SixMonths = () => {
    return (
        <div className="page">
            <HamburgerNav/>
            <h1 className="title">My Sound</h1>
            <TopTracks text={' Last Six Months'}amount={50}/>
        </div>
    )
}

export default SixMonths;