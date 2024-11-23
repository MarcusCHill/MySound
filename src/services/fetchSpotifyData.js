import axios from 'axios';
//axios is similar to fetch just makes my api calls a bit easier :)

//fetchSpotifyData is a reuasable fucntion that aceepts an accessToken and an endpoint to quickly request data at different endpoints
export async function fetchSpotifyData(accessToken, endpoint){
    try{
        const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return response.data
    }catch(error){
        throw error
    }

}