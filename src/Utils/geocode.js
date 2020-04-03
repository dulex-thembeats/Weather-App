const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibXVoYW1tYWQtYWJkdWxrYWRpciIsImEiOiJjazg0am5yZ3ExOXJpM2htc3I3empyMzRqIn0.c1EIg55BVBD_vMvQ_eJx_A";
    request({url, json: true}, (error, response) => {
        if(error){
            callback("You're currently not connected to the internet",undefined);
        } else if(response.body.error){
            callback("Error fetching Data", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                places: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;