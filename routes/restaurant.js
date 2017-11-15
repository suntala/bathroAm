const express = require('express')
const router = express.Router()
const RestaurantService = require('../services/restaurant-service')

router.get('/all', async (req, res, next) => {
    const participants = await RestaurantService.alphaRestaurants()
    res.render('restaurant-list', {participants})
});

router.get('/:id', async (req, res, next) => {
    const restaurant = await RestaurantService.find(req.params.id)
    res.render('restaurant-detail', {restaurant})
});

router.get('/all/by_neighborhood', async (req, res, next) => {
    const kreuzberg = await RestaurantService.gatherNeighborhood('Kreuzberg');
    const mitte = await RestaurantService.gatherNeighborhood('Mitte');
    const prenzlauerBerg = await RestaurantService.gatherNeighborhood('Prenzlauer Berg');
    const charlottenburg = await RestaurantService.gatherNeighborhood('Charlottenburg');
    const friedrichshain = await RestaurantService.gatherNeighborhood('Friedrichshain');
    const moabit = await RestaurantService.gatherNeighborhood('Moabit');
    const schoneberg = await RestaurantService.gatherNeighborhood('Schoneberg');
    const neukolln = await RestaurantService.gatherNeighborhood('Neukolln');
    res.render('restaurant-list-neighborhood', {kreuzberg, mitte, prenzlauerBerg, charlottenburg, friedrichshain, moabit, schoneberg, neukolln})
});

router.post('/', async (req, res, next) => {
    const restaurant = await RestaurantService.add(req.body)

    res.send(restaurant)
})

router.delete('/:id', async (req, res, next) => {
    await RestaurantService.del(req.params.id)

    res.send('The restaurant has been deleted.')
})

module.exports = router
