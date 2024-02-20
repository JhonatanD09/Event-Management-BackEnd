const axios = require('axios')
import { map } from '../../application/config/config';

const getCoorByAddress = async (address) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    const params = {access_token : map.key};
    try{
       return await axios.get(url, {params: params});
    }catch(err){
        console.log(err)
    }
}

const converToRadians = (degrees) =>{
    return degrees * Math.PI / 180;
}

const distance = (lat1, lon1, lat2, lon2) => {
    const radius = 6371;

    const dLat = converToRadians(lat2 - lat1);
    const dLon = converToRadians(lon2 - lon1);

    const haversine = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(converToRadians(lat1)) * Math.cos(converToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const arcTanHaversine = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

    // Distancia en kilómetros
    const distance = radius * arcTanHaversine;

    return distance;
}

module.exports = {
    getCoorByAddress, distance
}