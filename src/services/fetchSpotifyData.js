import axios from 'axios';

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