const fs = require('fs')
const RestaurantModel = require('../models/restaurant-model')

const findAll = async () => {
    return RestaurantModel.find()
}

const add = async (person) => {
    return RestaurantModel.create(person)
}

const del = async (id) => {
    return RestaurantModel.remove({ id })
}

const find = async (id) => {
    return RestaurantModel.findOne({ id })
}

const findParticipating = async () => {
    return RestaurantModel.find({status: true})
}

const alphaRestaurants = async () => {
    participants = await findParticipating();
    return participants.sort(function(a, b) {
        return a.name > b.name;
    });    
};

const gatherNeighborhood = async (specificNeighborhood) => {
    participants = await findParticipating();
    neighborhoodRestos = []
    await participants.forEach(function(resto){
        if (resto.neighborhood === specificNeighborhood) {
            neighborhoodRestos.push(resto)};
    });
    return neighborhoodRestos;
}

/////////////
const restaurantNames = async () => {
    participants = await findParticipating();
    participantNames = []
    await participants.forEach(function(resto){
        participantNames.push(resto.name)
    })
    return participantNames;
}

const alphaNames = async () => {
    names = await restaurantNames();
    return names.sort();
}

const fullDetails = async (name) => {
    return RestaurantModel.find({ name });
}
///////////////

module.exports = {
    findAll,
    find,
    add,
    del,
    findParticipating,
    restaurantNames,
    alphaNames,
    fullDetails,
    alphaRestaurants,
    gatherNeighborhood
}
  
