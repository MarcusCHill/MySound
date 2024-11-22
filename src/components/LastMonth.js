import React from "react";
import HamburgerNav from "./HamburgerNav";
import TopTracks from "./TopTracks";

const LastMonth = () => {
    return (
        <div className="page">
            <HamburgerNav/>
            <h1 className="title">My Sound</h1>
            <TopTracks text={' Last Month'} amount={50}/>
        </div>
    )
}

export default LastMonth;