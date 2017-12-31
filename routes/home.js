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
    let time = req.body.time.replace(':','');
    let weekday = req.body.weekday;  
    let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
    if (selection.length > 0) {
        let closest = selection[0];
        let cooClosest = await RestoServices.getIdCoo(closest.id);
        res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
    }
    else {
        res.send(`BathroAm could not find any partner restaurants within the parameters provided. Please try again with a higher threshold or different time.`)
    }
})

module.exports = router;
