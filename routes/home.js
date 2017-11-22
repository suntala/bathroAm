const express = require('express');
const router = express.Router();
const RestoServices = require('../services/restaurant-service')
const moment = require('moment');

router.get('/', (req, res, next) => {
    res.render('home')
});

router.post('/', async (req, res, next) => {
    let address = req.body.address
    let inputTime = req.body.time
    let time = inputTime.replace(':','');
    let selection = await RestoServices.findResults(time,address,req.body.threshold);
    console.log(selection);
    res.render('home-response', {time, selection})
})


module.exports = router;
















// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     var time = req.body.gpsCoordinates
//     console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
//     res.render('home-response', {resto, time})
// })

// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.render('home-response', {resto})
// })


// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     var time = req.body.time
//     res.render('home-response', {resto, time})
// })

// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.render('home-response', {resto})
// })

// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.render('home-response', {resto})
// })


// router.post('/te', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.render('home-response', {resto})
// })

// router.post('/te', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.render('home-response', {resto})
// })

// router.post('/te', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, gpsCoordinates: req.body.gpsCoordinates})
//     res.redirect('/about')
// })

// router.get('/te', (req, res, next) => {
//     res.render('home')
// })

// router.post('/te', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, status: req.body.status })
//     res.redirect('/restaurant/all')
// })






// router.get('/test', (req, res, next) => {
//     console.log("first")
//     res.render('home')
// });

// router.post('/test', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name, status: req.body.status })  
//     res.redirect('/restaurant/all')  
// })


// router.post('/test', async (req, res, next) => {
//     // var time = await req.body.time
//     var resto = await RestoServices.add({ name: req.body.name, status: req.body,status })    
//     console.log('hi')
//     console.log(req.body.name)
//     res.redirect('/about')
// })



////////////////////














// (do i have require pug in here or something?)
//do this page from the beginning...



// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res, next) => {
//     res.render('home')
// });

// router.post('/', (req, res, next) => {
//     req.body.name
// })

// module.exports = router;
// // (do i have require pug in here or something?)
// //do this page from the beginning...



// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name })
//     res.redirect('restaurant/all')
// })

// router.post('/', async (req, res, next) => {
//     var resto = await RestoServices.add({ name: req.body.name })
//     console.log("hi")
//     res.render('about')
// })