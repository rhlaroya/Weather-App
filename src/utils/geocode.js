const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmhsYXJveWEiLCJhIjoiY2t5ZGdnamVqMHoyZTJ1cWtwZjdldnl0MSJ9.MjoMJGru7jEaTko9x0YTtw';
    request({ url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to location services')
        } else if(body.features.length === 0){
            callback('Unable to find location try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode