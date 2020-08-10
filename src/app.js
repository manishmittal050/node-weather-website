const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.use is use to customize the server
// set up static directory to work
app.use(express.static(publicDirectoryPath))


// localhost:3000

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Manish Mittal'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manish Mittal'
    });
})

app.get('/weather/forecast', (req, resp) => {

    if (!req.query.address) {
        return resp.send({
            error: 'You must provide an address'
        })
    }
    // console.log(req.query.address);

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return resp.send({
                error
            });
        }
        else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return  resp.send({
                        error
                    });
                }

                resp.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            });
        }

    });
})


app.get('/products', (req, resp) => {

    if (!req.query.search) {
        return resp.send({
            error: 'Error message'
        })
    }

    resp.send({
        products: []
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('404Page', {
        title: '404',
        name: 'Manish Mittal',
        errorMessage: 'Help article not found',
    });
});
app.get('*', (req, resp) => {
    resp.render('404Page', {
        title: '404',
        name: 'Manish Mittal',
        errorMessage: 'Page not found'
    })
})




app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});