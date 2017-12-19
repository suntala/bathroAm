const express = require('express')
const bodyParser = require('body-parser')
require('./database-connection')

const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine', 'pug')

const home = require('./routes/home')
const restaurant = require('./routes/restaurant')
const me = require('./routes/edit-restaurant')

app.use('/', home)
app.use('/restaurant', restaurant)
app.use('/inputform', me)

app.get('/about', (req, res, next) => {
    res.render('about')
})
app.get('/contact', (req, res, next) => {
    res.render('contact')
})
app.get('/restaurant', (req, res, next) => {
    res.render('restaurant')
})



//////////////

const RestaurantService = require('./services/restaurant-service')
const main = async () => {
    // await RestaurantService.find(1).then(console.log);
    // await RestaurantService.findParticipating().then(console.log);
    // test = await RestaurantService.find(1);
    // console.log(test);
    // await RestaurantService.oneRestaurantName(test).then(console.log);
    // await RestaurantService.restaurantNames().then(console.log);
    // await RestaurantService.alphaNames().then(console.log);
    // await RestaurantService.fullDetails('Cocolo Ramen').then(console.log);
    // await RestaurantService.alphaFullDetails().then(console.log);
    // await RestaurantService.alphaRestaurants().then(console.log);
    // await RestaurantService.alphaFullDetails().then(console.log);
    // await RestaurantService.inputLat()
    // await RestaurantService.inputCoo(5);
    // await RestaurantService.inputMultiCoo([1,2]);
    // await RestaurantService.distance("Potsdamer Str. 3, 10785", 1).then(console.log);
    // await haversine([13.3992771, 52.5271711], [13.3736812, 52.5089801])
    // await RestaurantService.findDistance("Potsdamer Str. 3, 10785", 5).then(console.log);
    // await RestaurantService.findDistance(1).then(console.log);    
    // await RestaurantService.multiDistances([1,2,3,4,5]).then(console.log);  
    // await RestaurantService.multiDistances("Potsdamer Str. 3, 10785",[1,2]).then(console.log); 
    // await RestaurantService.findAddressDetails("Potsdamer Str. 3, 10785").then(console.log);
    // await RestaurantService.nearToFar("Potsdamer Str. 3, 10785").then(console.log); 
    // await RestaurantService.getAllIds().then(console.log);     
    // await RestaurantService.findClosest("Potsdamer Str. 3, 10785", 3).then(console.log); 
    // await RestaurantService.giveName(1).then(console.log)    
    // await RestaurantService.giveMultiNames([1,2]).then(console.log)    
    // await RestaurantService.displayNames("Potsdamer Str. 3, 10785", 3).then(console.log)    
    // await RestaurantService.inputHours(1, [0900, 2200]).then(console.log)
    // await RestaurantService.inputHours(2, [1800, 2300]).then(console.log)  
    // await RestaurantService.inputHours(3, [1300, 1400]).then(console.log)            
    // await RestaurantService.inputHours(4, [1300, 1400]).then(console.log)            
    // await RestaurantService.inputHours(5, [1300, 1400]).then(console.log)   
    // await RestaurantService.findOpen(1500).then(console.log)  
    // await RestaurantService.findClosestFull("Potsdamer Str. 3, 10785", 3).then(console.log);  
    // await RestaurantService.findClosest("Potsdamer Str. 3, 10785", 5).then(console.log);  
    // let array = [ { id: 1, distance: 2.6628926738749 },{ id: 2, distance: 2.145437024942484 },{ id: 4, distance: 0 },{ id: 5, distance: 2.917873609003296 } ]
    // await RestaurantService.mapToBigger(array).then(console.log);  
    // await RestaurantService.findClosestFull("Potsdamer Str. 3, 10785",3).then(console.log);      
    // await RestaurantService.findClosest("Potsdamer Str. 3, 10785",3).then(console.log); 
    // await RestaurantService.findResults(1600,"Potsdamer Str. 3, 10785",5).then(console.log);   
    // await RestaurantService.inputHours(1, [{weekday: 'mon', intervals: [{from: 0900, to: 2200}]}]).then(console.log);
    // await RestaurantService.inputHours(2, [{weekday: 'mon', intervals: [{from: 1400, to: 1900}]}]).then(console.log);
    // await RestaurantService.inputHours(3, [{weekday: 'mon', intervals: [{from: 1400, to: 1900}]}]).then(console.log);
    // await RestaurantService.inputHours(4, [{weekday: 'mon', intervals: [{from: 1400, to: 1500}, {from: 1700, to:1900}]}]).then(console.log);
    // await RestaurantService.inputHours(5, [{weekday: 'mon', intervals: [{from: 1400, to: 1900}]}]).then(console.log); 
    // await RestaurantService.inputCoo(1).then(console.log)
    // await RestaurantService.inputHours(1, [{weekday: 'mon', intervals: [{from: 0900, to: 2200}]},{weekday: 'tue', intervals: [{from: 0900, to: 2200}]}]).then(console.log);
    // await RestaurantService.inputHours(2, [{weekday: 'tue', intervals: [{from: 1400, to: 1900}]}]).then(console.log);
    // await RestaurantService.inputHours(3, [{weekday: 'wed', intervals: [{from: 1400, to: 1900}]}]).then(console.log);
    // await RestaurantService.inputHours(4, [{weekday: 'thur', intervals: [{from: 1400, to: 1500}, {from: 1700, to:1900}]}]).then(console.log);
    // await RestaurantService.inputHours(5, [{weekday: 'fri', intervals: [{from: 1400, to: 1900}]}]).then(console.log); 
    await RestaurantService.inputHours(1, [{weekday: 'mon', intervals: [{from: 0800, to: 0900}, {from: 1000, to: 2200}]},{weekday: 'tue', intervals: [{from: 0900, to: 2200}]}]).then(console.log);
} 

// main();


//////////////

module.exports = app
