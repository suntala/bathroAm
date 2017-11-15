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





//////////////

const RestaurantService = require('./services/restaurant-service')
const main = async () => {
    // await RestaurantService.find(1).then(console.log);
    // await RestaurantService.findParticipating().then(console.log);

    // test = await RestaurantService.find(1);
    // console.log(test);
    // await RestaurantService.oneRestaurantName(test).then(console.log);
    await RestaurantService.restaurantNames().then(console.log);
    // await RestaurantService.alphabeticalNames().then(console.log);
    // await RestaurantService.fullDetails('Cocolo Ramen').then(console.log);
    await RestaurantService.alphaFullDetails().then(console.log);

}

main();

//////////////










//haven't put cookie parser yet (or used it) 






// await console.log(RestaurantService.find(1));
    // await find(1);