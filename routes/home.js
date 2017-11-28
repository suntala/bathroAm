const express = require('express');
const router = express.Router();
const RestoServices = require('../services/restaurant-service')
const moment = require('moment');

router.get('/', (req, res, next) => {
    res.render('home')
});

router.post('/', async (req, res, next) => {
    let address = req.body.address
    let cooAddress = await RestoServices.getAddressCoo(address);
    // console.log(cooAddress);
    let inputTime = req.body.time
    let time = inputTime.replace(':','');
    let weekday = req.body.weekday;    
    let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
    let test = selection[0];
    let cooTest = await RestoServices.getIdCoo(test.id);
    // console.log(cooTest);
    res.render('home-response', {time, weekday, selection, cooAddress, cooTest})
})


module.exports = router;
