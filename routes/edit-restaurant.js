const express = require('express')
const router = express.Router()
const RestoServices = require('../services/restaurant-service')

router.get('/create', (req, res, next) => {
    res.render('input-resto')
})

router.post('/create', async (req, res, next) => {
    let hoursInfo = [req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2]
    let rawHours = await RestoServices.setUpOpeningHours(req.body.weekday, req.body.confirmation, hoursInfo)
    let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})


router.get('/edit', async (req, res, next) => {
    let participants = await RestoServices.alphaRestaurants()
    res.render('input-resto-edit-main-page', { participants })
})


router.get('/:id/edit', async (req, res, next) => {
    let resto = await RestoServices.find(req.params.id) 
    let timeReconstitution = (numberTime) => {
        if (`${numberTime}`.length == 4) {
            return `${numberTime}`.slice(0, (`${numberTime}`.length-2)) + ":" + `${numberTime}`.slice((`${numberTime}`.length-2)) 
        }
        else {
            return "0" + `${numberTime}`.slice(0, (`${numberTime}`.length-2)) + ":" + `${numberTime}`.slice((`${numberTime}`.length-2)) 
        }
    }
    let fromTimeReconstituded = timeReconstitution(resto.openingHours[0].intervals[0].from)
    let toTimeReconstituded = timeReconstitution(resto.openingHours[0].intervals[0].to)
    let restoHours = [fromTimeReconstituded, toTimeReconstituded]
    let restoOpenDays = []
    for (let i = 0; i < resto.openingHours.length; i++) {
        restoOpenDays.push(resto.openingHours[i].weekday)
    }
    res.render('input-resto-edit', {resto,restoOpenDays,restoHours})
})

router.post('/:id/edit', async (req, res, next) => {
    let hoursInfo = [req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2]
    let rawHours = await RestoServices.setUpOpeningHours(req.body.weekday, req.body.confirmation, hoursInfo)
    let resto = await RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: rawHours, address: req.body.address, website: req.body.website})
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})

module.exports = router

