const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/5ac567a97f6284880d49e8dda1b6a449/${lat},${long}`;
    request({url, json: true}, (error, response) => {
        if(error){
            callback("You're currently not connected to the internet", undefined);
        } else if(response.body.error){
            callback("Error Fetching Data", undefined);
        } else {
            callback(undefined, `it's  currently ${response.body.daily.data[0].summary} There's a ${response.body.currently.precipProbability} chance of rain`)
        }
    })
}

module.exports = forecast;