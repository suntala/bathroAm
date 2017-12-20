const express = require('express')
const router = express.Router()
const RestoServices = require('../services/restaurant-service')

router.get('/create', (req, res, next) => {
    res.render('input-resto')
})

router.post('/create', async (req, res, next) => {
    let timeFrom1 = req.body.timeFrom1.replace(':','');
    let timeTo1 = req.body.timeTo1.replace(':','');
    let timeFrom2 = req.body.timeFrom2.replace(':','');
    let timeTo2 = req.body.timeTo2.replace(':','');
    let weekdays = req.body.weekday
    let rawHours = []
    for (let i = 0; i < weekdays.length; i++) {
        let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
        rawHours.push(day)
    }
    let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})
//how come this worked with :  openingHours: req.body.openingHours



router.get('/:id/edit', async (req, res, next) => {
    let resto = await RestoServices.find(req.params.id) 
    // let fromTimeReconstituded = `resto.openingHours[0].intervals[0].from`.slice(0, resto.openingHours[0].intervals[0].from.length)
    let restoOpenDays = []
    // let restoHours = []
    for (let i = 0; i < resto.openingHours.length; i++) {
        restoOpenDays.push(resto.openingHours[i].weekday)
    }
    res.render('input-resto-edit', {resto,restoOpenDays})
})


router.post('/:id/edit', async (req, res, next) => {
    let timeFrom1 = req.body.timeFrom1.replace(':','');
    let timeTo1 = req.body.timeTo1.replace(':','');
    let timeFrom2 = req.body.timeFrom2.replace(':','');
    let timeTo2 = req.body.timeTo2.replace(':','');
    let weekdays = req.body.weekday
    let rawHours = []
    for (let i = 0; i < weekdays.length; i++) {
        let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
        rawHours.push(day)
    }
    let resto = await RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: rawHours, address: req.body.address, website: req.body.website})
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})
//have less repetition; create a function to take care of time
//I guess I change all the elements with edit for now

module.exports = router