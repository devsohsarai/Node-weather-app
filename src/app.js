const path = require('path')
const express = require("express")
const hbs  = require("hbs")
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const chalk = require('chalk')
//Define Path For Express Config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewDirectoryPath = path.join(__dirname,"../template/views")
const partialsPath = path.join(__dirname,"../template/partials")

// Setup handler engine and view location
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Start the page routing
app.get('',(req,res) => {
    res.render('index',{
        title : "Weather Page Title",
        created_by : "Ravinesh"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About Us",
        created_by : "Global360 Pvt Ltd"
    });
})

app.get('/plan',(req,res) => {
    res.render('plan',{title:"Plan Page",created_by:"Dhruvita"})
})

app.get('/weather',(req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place_name } = {}) => { 
        
        if(error) {
          return res.send({ error })
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }
            return res.send({
                forecast : forecastData,
                place_name,
                address: req.query.address

            })    
        })
    })
})


app.get('/products',(req,res) => {
   
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/plan/*',(req,res) => {
    res.render('404',{
        title: "404 Page",
        errorMessage : "Page Data Not Found!",
        created_by : "Ravinesh"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: "404 Page",
        errorMessage : "Page Not Found!",
        created_by : "Ravinesh"
    })
})

app.listen(port,() => console.log("Web server has starter on port : "+port))