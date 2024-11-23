import React from 'react';

//Accepts refreshToken to provide user the opportunity to resolve the error due to an invalid Token
//refreshToken is defined in services/spotify.js
const Error = ({ refreshToken }) => {
    
    return (
        <div className='page error'>
            <h1>Error fetching spotify data.</h1>
            <button onClick={() => refreshToken()}>Refresh Token</button>
        </div>
    )
}

export default Error;