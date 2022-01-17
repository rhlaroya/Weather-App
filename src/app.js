const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express()

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
    res.send({
        forecast: 'Sunny',
        location: 'Providence'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})