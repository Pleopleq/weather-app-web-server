const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const geoCode = require("./utils/geocode")
const weather = require("./utils/weather")

const publicDirectory = path.join(__dirname, "../public")
const viewsDirectory = path.join(__dirname, "../views")
const partialsDirectory = path.join(__dirname, "../views/partials")

app.set("view engine", "hbs")
app.set("views", viewsDirectory)
hbs.registerPartials(partialsDirectory)
app.use(express.static(publicDirectory))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address."
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error: error })
        }
        
        weather(latitude,longitude, (error, weatherData) => {
            if(error) {
                return res.send({ error: error })
            }

            res.send({
                weather: weatherData,
                location,
                address: req.query.address
            })
        })
    })     
})

app.get("*", (req, res) => {
    res.render("404")
})

app.listen(3000, () => {
    console.log("Server up in port 3000")
})