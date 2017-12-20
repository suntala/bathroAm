const express = require('express')
const router = express.Router()
const RestoServices = require('../services/restaurant-service')

router.get('/create', (req, res, next) => {
    res.render('input-resto')
})

router.post('/create', async (req, res, next) => {
    let timeFrom = req.body.timeFrom.replace(':','');
    let timeTo = req.body.timeTo.replace(':','');
    let rawHours = [{weekday: req.body.openDay, intervals: [{from: timeFrom, to: timeTo}]}]
    let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})



// router.post('/create', async (req, res, next) => {
//     let inputFrom = req.body.timeFrom
//     let inputTo = req.body.timeTo
//     let timeFrom = inputFrom.replace(':','');
//     let timeTo = inputTo.replace(':','');
//     let rawHours = [{weekday: req.body.openDay, intervals: [{from: timeFrom, to: timeTo}]}]
//     let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
//     await RestoServices.inputCoo(resto.id)
//     await RestoServices.inputHours(resto.id,rawHours)
//     res.redirect('/restaurant/all')
// })



// router.post('/create', async (req, res, next) => {
//     // let inputFrom = req.body.timeFrom
//     // let inputTo = req.body.timeTo
//     // let timeFrom = inputFrom.replace(':','');
//     // let timeTo = inputTo.replace(':','');
//     let rawHours = [{weekday: req.body.openDay, intervals: [{from: req.body.timeFrom, to: req.body.timeTo}]}]
//     let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
//     await RestoServices.inputCoo(resto.id)
//     await RestoServices.inputHours(resto.id,rawHours)
//     res.redirect('/restaurant/all')
// })

router.get('/:id/edit', async (req, res, next) => {
    let resto = await RestoServices.find(req.params.id) 
    res.render('input-resto-edit', {resto})
})

router.post('/:id/edit', async (req, res, next) => {
    RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status})
    res.redirect('/restaurant/all')
})

module.exports = router