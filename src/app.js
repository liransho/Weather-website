const  path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const paritalPath = path.join(__dirname,'../templates/partials')

//Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(paritalPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Liran Shoshana'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me' ,
        name: 'Liran Shoshana'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'its help page',
        title: 'Help' ,
        name: 'Liran Shoshana'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    else{
        geocode(req.query.address,(error,{latitude,altitude,location}={})=>{
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, altitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error
                    })
                }
                return res.send({
                    forecastData: forecastData,
                    location,
                    address: req.query.address
                })

            })
        })
    }
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'Liran Shoshana'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Liran Shoshana'

    })
})
app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})