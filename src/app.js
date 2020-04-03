const path = require('path');
const forecast = require('./Utils/forecast');
const geocode = require('./Utils/geocode');
const request = require('request');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Express path config
const viewPath = path.join(__dirname, '../Templates/views');
const publicDirectory = path.join(__dirname, '../Public');
const partialsDirectory = path.join(__dirname, '../Templates/partials');

//handlebars template engine location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsDirectory);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Created by dulex'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'created by Dulex'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'created by Dulex'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'error: You must provide address term'
        })
    }
          geocode(req.query.address, (error, {latitude, longitude, places} = {}) => {
        if(error){
            return res.send({
                error: error
                
            })
        }
        
         forecast(latitude, longitude, (error, forecastData) => {
             if(error){
                return res.send({
                    error: 'error: You must provide address term'
                })
             }
             res.send({
                forecast: forecastData,
                location: places,
                Address: req.query.address
            });
         })
     });
    }
   )

app.get('/Products', (req, res) => {
   if(!req.query.search){
       return res.send({
           error: 'error: You must provide search term'
       })
   }
    res.send({
        products: []
    });
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'created by Dulex',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'created by Dulex',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('app listening on port 3000');
})