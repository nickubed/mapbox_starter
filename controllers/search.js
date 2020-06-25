require('dotenv').config()
let router = require('express').Router()
let db = require('../models')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN})

router.get('/', (req, res) => {
    geocodingClient.forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`
    })
    .send()
    .then(response => {
        let match = response.body.features[0]
        let query = response.body.query
        // console.log(match.features[0].center)
        // res.send(match)
        res.render('show', { query, match, mapkey: process.env.MAPBOX_TOKEN })
    })
})

router.post('/fave', (req, res) => {
    db.place.create({
        city: req.body.city,
        state: req.body.state,
        lat: req.body.lat,
        long: req.body.long
    })
    .then(response => {
        res.redirect('/')
    })
})


module.exports = router