const express = require('express')
const router = express.Router()
const RestoServices = require('../services/restaurant-service')

router.get('/create', (req, res, next) => {
    res.render('input-resto')
})

router.post('/create', async (req, res, next) => {
    var resto = await RestoServices.add({ name: req.body.name, status: req.body.status })
    res.redirect('/restaurant/all')
})

router.get('/:id/edit', async (req, res, next) => {
    var resto = await RestoServices.find(req.params.id) 
    res.render('input-resto-edit', {resto})
})

router.post('/:id/edit', async (req, res, next) => {
    RestoServices.edit(req.params.id, { name: req.body.name, status: req.body.status})
    res.redirect('/restaurant/all')
})
//change all the "var" stuff


module.exports = router