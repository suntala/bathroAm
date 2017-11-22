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




//later figure out how to give restau details 
//in the deletion message -->(this is in reference to router delete)

// router.get('/', async (req, res, next) => {
//     res.render(await RestaurantService.findAll())
// });  
//  -->what is the point of this?

//decide where we want to route to, the different pages...
// should plain slash resto page be list of all or something
//else intermediary like an introduction or something?
// what does his plain slash page do? sending findAll...
//make sure find() finds all right?
//i think it's ok to publish restaurant details 
//for nonparticipants but just don't link to them... or what do you think?
//otherwise can just limit to finding participants and including details 
//from within that (so instead find, do findParticipating...)
//I'm not using findOne inside findParticipating which i am then using with the requested name. is that ok?