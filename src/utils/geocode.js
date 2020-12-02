const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const request = require("request")

function geoCode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`
    const parameters ={
        url,
        json: true
    }

    request(parameters, (error, response, body) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geoCode