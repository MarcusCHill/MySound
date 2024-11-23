import React from 'react';

const Error = ({ refreshToken }) => {
    
    return (
        <div className='page error'>
            <h1>Error fetching spotify data.</h1>
            <button onClick={() => refreshToken()}>Refresh Token</button>
        </div>
    )
}

export default Error;