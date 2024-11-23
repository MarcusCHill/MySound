import React from "react";
import { Link } from "react-router-dom";

    const Login = ({ autorize }) => {
        return(
            <div className="login">
                <h2>Welcome To</h2>
                <h1>My Sound</h1>
                <button onClick={autorize}>Login with Spotify</button>
                <Link to="https://www.spotify.com/us/signup" target="_blank">No Spotify Account?</Link>
            </div>
        )
    }

export default Login;