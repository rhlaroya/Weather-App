const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars endgine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Regae Laroya'
    })
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Regae Laroya'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'For help contact me via email at rhlaroya@gmail.com',
        title: 'Help',
        name: 'Regae Laroya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address ){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send(error);
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send(error)
            }

            res.status(200).send({
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: {}
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Error Article',
        message: 'Article Not Found!',
        name: 'Regae Laroya'
    })
})

app.get('*', (req, res)=> {
    res.render('help', {
        title: '404',
        message: 'Page Not Found!',
        name: 'Regae Laroya'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})