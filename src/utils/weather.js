const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const request = require("request")

function weather(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${parseFloat(latitude)}, ${parseFloat(longitude)}`
    const parameters ={
        url,
        json: true
    }
    
    request(parameters, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = weather