const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title :'Weather App',
        name : 'Jijo Thomas'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About Me',
        name:'Jijo Thomas'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText : 'This is some helpful text.',
        title: 'Help',
        name :'Jijo Thomas'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error :'Please provide an Address '
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if (error){
            return res.send({
                error                
            })
        }
            forecast(latitude,longitude,(error,forecastData) => {
                if (error){
                    return res.send ({
                        error
                    })
                }
                    res.send ({
                        forecast : forecastData,        
                        location,
                        address : req.query.address
                    })
            })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})
//  app.com
//  app.com/help
//  app.com/about
app.get('/help/*',(req,res) => {
    res.render('404error',{
        errorMessage :'Help Article not Found',
        title: 'Error Page!!!',
        name :'Jijo Thomas'
    })
})

app.get('*',(req,res) => {
    res.render('404error',{
        errorMessage :'Page Not Found',
        title: 'Error Page!!!',
        name :'Jijo Thomas'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})