const express = require('express')
const bodyParser = require('body-parser')
require('./database-connection')

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

const home = require('./routes/home')
const restaurant = require('./routes/restaurant')

app.use('/', home)
app.use('/restaurant', restaurant)

app.get('/about', (req, res, next) => {
    res.render('about')
})
app.get('/contact', (req, res, next) => {
    res.render('contact')
})
app.get('/restaurant', (req, res, next) => {
    res.render('restaurant')
})

app.listen(3000, () => {
    console.log('Server listening.')
})
