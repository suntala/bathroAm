const express = require('express');
const router = express.Router();
const RestoServices = require('../services/restaurant-service')
const moment = require('moment');

router.get('/', (req, res, next) => {
    res.render('home')
});

router.post('/', async (req, res, next) => {
    let address = req.body.address
    let cooAddress = await RestoServices.getAddressCoo(address); //shouldn't repeat getAddressCoo maybe or the findResults function shouldn't use it
    // console.log(cooAddress);
    // let inputTime = req.body.time
    // let time = inputTime.replace(':','');
    let time = req.body.time.replace(':','');
    let weekday = req.body.weekday;  
    let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
    if (selection.length > 0) {
        let closest = selection[0];
        let cooClosest = await RestoServices.getIdCoo(closest.id);
        // console.log(cooTest);
        res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
    }
    else {
        res.send(`BathroAm could not find any partner restaurants within the parameters provided. Please try again with a higher threshold or different time.`)
    }
    // if (cooAddress != false) {
    //     let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
    //     if (selection.length > 0) {
    //         let closest = selection[0];
    //         let cooClosest = await RestoServices.getIdCoo(closest.id);
    //         // console.log(cooTest);
    //         res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
    //     }
    //     else {
    //         res.send(`BathroAm could not find any partner restaurants within the parameters provided. Please try again with a higher threshold or different time.`)
    //     }
    // }  
    // else {
    //     res.send(`BathroAm could not find the requested address. Make sure your submission has the following format: street address, postal code.`)
    // }
})
//if selection.length -->render something else ; then in pug say if Coo  <--huh? what does second part mean??
//also if status is not ok... (second else statement)



// router.post('/', async (req, res, next) => {
//     let address = req.body.address
//     let cooAddress = await RestoServices.getAddressCoo(address); //shouldn't repeat getAddressCoo maybe or the findResults function shouldn't use it
//     // console.log(cooAddress);
//     // let inputTime = req.body.time
//     // let time = inputTime.replace(':','');
//     let time = req.body.time.replace(':','');
//     let weekday = req.body.weekday;  
//     if (cooAddress != false) {
//         let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
//         if (selection.length > 0) {
//             let closest = selection[0];
//             let cooClosest = await RestoServices.getIdCoo(closest.id);
//             // console.log(cooTest);
//             res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
//         }
//         else {
//             res.send(`BathroAm could not find any partner restaurants within the parameters provided. Please try again with a higher threshold or different time.`)
//         }
//     }  
//     else {
//         res.send(`BathroAm could not find the requested address. Make sure your submission has the following format: street address, postal code.`)
//     }
// })
// //if selection.length -->render something else ; then in pug say if Coo  <--huh? what does second part mean??
// //also if status is not ok... (second else statement)




// router.post('/', async (req, res, next) => {
//     let address = req.body.address
//     let cooAddress = await RestoServices.getAddressCoo(address); //shouldn't repeat getAddressCoo maybe or the findResults function shouldn't use it
//     // console.log(cooAddress);
//     // let inputTime = req.body.time
//     // let time = inputTime.replace(':','');
//     let time = req.body.time.replace(':','');
//     let weekday = req.body.weekday;  
//     if (cooAddress != false) {
//         let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
//         if (selection.length > 0) {
//             let closest = selection[0];
//             let cooClosest = await RestoServices.getIdCoo(closest.id);
//             // console.log(cooTest);
//             res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
//         }
//         else {
//             res.send(`BathroAm could not find any partner restaurants within the parameters provided. Please try again with a higher threshold or different time.`)
//         }
//     }  
//     else {
//         res.send(`BathroAm could not find the requested address. Make sure your submission has the following format: street address, postal code.`)
//     }
// })




// router.post('/', async (req, res, next) => {
//     let address = req.body.address
//     let cooAddress = await RestoServices.getAddressCoo(address);
//     // console.log(cooAddress);
//     // let inputTime = req.body.time
//     // let time = inputTime.replace(':','');
//     let time = req.body.time.replace(':','');
//     let weekday = req.body.weekday;    
//     let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
//     let closest = selection[0];
//     let cooClosest = await RestoServices.getIdCoo(closest.id);
//     // console.log(cooTest);
//     res.render('home-response', {time, weekday, selection, cooAddress, cooClosest, address, closest})
// })
// //if selection.length -->render something else ; then in pug say if Coo


module.exports = router;
