const express = require('express')
const router = express.Router()
const RestoServices = require('../services/restaurant-service')
//rename so that they are all RestoServices or restaurantService

router.get('/create', (req, res, next) => {
    res.render('input-resto')
})

router.post('/create', async (req, res, next) => {
    let hoursInfo = [req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2]
    let rawHours = await RestoServices.setUpOpeningHours(req.body.weekday, req.body.confirmation, hoursInfo)
    // console.log(req.body.weekday)
    let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})
//how come this worked with :  openingHours: req.body.openingHours
//replace request.body with rb...



// router.post('/create', async (req, res, next) => {
//     let rawHours = await RestoServices.setUpOpeningHours([req.body.weekday], req.body.confirmation, req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2)
//     let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
//     await RestoServices.inputCoo(resto.id)
//     await RestoServices.inputHours(resto.id,rawHours)
//     res.redirect('/restaurant/all')
// })



// router.post('/create', async (req, res, next) => {
//     let timeFrom1 = req.body.timeFrom1.replace(':','');
//     let timeTo1 = req.body.timeTo1.replace(':','');
//     let timeFrom2 = req.body.timeFrom2.replace(':','');
//     let timeTo2 = req.body.timeTo2.replace(':','');
//     let weekdays = req.body.weekday
//     let rawHours = []
//     for (let i = 0; i < weekdays.length; i++) {
//         let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
//         rawHours.push(day)
//     }
//     let resto = await RestoServices.add({ name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: req.body.openingHours, address: req.body.address, website: req.body.website })
//     await RestoServices.inputCoo(resto.id)
//     await RestoServices.inputHours(resto.id,rawHours)
//     res.redirect('/restaurant/all')
// })

router.get('/edit', async (req, res, next) => {
    let participants = await RestoServices.alphaRestaurants()
    // let participants = await RestoServices.alphaRestaurants()
    res.render('input-resto-edit-main-page', { participants })
})

// router.get('/edit', (req, res, next) => {
//     // const participants = await RestoServices.alphaRestaurants()
//     res.render('input-resto-edit-main-page', { participants })
// })

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
    // console.log(restoHours)
    let restoOpenDays = []
    for (let i = 0; i < resto.openingHours.length; i++) {
        restoOpenDays.push(resto.openingHours[i].weekday)
    }
    res.render('input-resto-edit', {resto,restoOpenDays,restoHours})
})

// router.get('/:id/edit', async (req, res, next) => {
//     let resto = await RestoServices.find(req.params.id) 
//     // let fromTimeReconstituded = `${resto.openingHours[0].intervals[0].from}`.slice(0, resto.openingHours[0].intervals[0].from.length-3) + ":" + `${resto.openingHours[0].intervals[0].from}`.slice(resto.openingHours[0].intervals[0].from.length-3, -1)
//     let fromTimeReconstituded = `${resto.openingHours[0].intervals[0].from}`.slice(0, (`${resto.openingHours[0].intervals[0].from}`.length-2)) + ":" + `${resto.openingHours[0].intervals[0].from}`.slice((`${resto.openingHours[0].intervals[0].from}`.length-2)) 
//     let toTimeReconstituded = `${resto.openingHours[0].intervals[0].to}`.slice(0, (`${resto.openingHours[0].intervals[0].to}`.length-2)) + ":" + `${resto.openingHours[0].intervals[0].to}`.slice((`${resto.openingHours[0].intervals[0].to}`.length-2)) 
//     let restoOpenDays = []
//     let restoHours = [fromTimeReconstituded, toTimeReconstituded]
//     console.log(toTimeReconstituded)
//     for (let i = 0; i < resto.openingHours.length; i++) {
//         restoOpenDays.push(resto.openingHours[i].weekday)
//     }
//     res.render('input-resto-edit', {resto,restoOpenDays,restoHours})
// })



router.post('/:id/edit', async (req, res, next) => {
    let hoursInfo = [req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2]
    let rawHours = await RestoServices.setUpOpeningHours(req.body.weekday, req.body.confirmation, hoursInfo)
    // console.log(req.body.weekday)
    // console.log(rawHours)
    // let rawHours = await RestoServices.setUpOpeningHours([req.body.weekday], req.body.confirmation, req.body.timeFrom1,req.body.timeTo1, req.body.timeFrom2, req.body.timeTo2)
    let resto = await RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: rawHours, address: req.body.address, website: req.body.website})
    await RestoServices.inputCoo(resto.id)
    await RestoServices.inputHours(resto.id,rawHours)
    res.redirect('/restaurant/all')
})
//have less repetition; create a function to take care of time
//I guess I change all the elements with edit for now
//take care of null problem here too


// router.post('/:id/edit', async (req, res, next) => {
//     let timeFrom1 = req.body.timeFrom1.replace(':','');
//     let timeTo1 = req.body.timeTo1.replace(':','');
//     let timeFrom2 = req.body.timeFrom2.replace(':','');
//     let timeTo2 = req.body.timeTo2.replace(':','');
//     let weekdays = [req.body.weekday]
//     let rawHours = []
//     for (let i = 0; i < weekdays.length; i++) {
//         // let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
//         // rawHours.push(day)
//         if (!req.body.confirmation) {
//             let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
//             rawHours.push(day)
//         }
//         else {
//             let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1}]}
//             rawHours.push(day)
//         }
//     }
//     let resto = await RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status, neighborhood: req.body.neighborhood, openingHours: rawHours, address: req.body.address, website: req.body.website})
//     await RestoServices.inputCoo(resto.id)
//     await RestoServices.inputHours(resto.id,rawHours)
//     res.redirect('/restaurant/all')
// })

module.exports = router

