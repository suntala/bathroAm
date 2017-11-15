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
//is format ok?check video

const restaurantNames = async () => {
    participants = await findParticipating();
    participantNames = []
    await participants.forEach(function(resto){
        participantNames.push(resto.name)
    })
    return participantNames;
}

const alphabeticalNames = async () => {
    names = await restaurantNames();
    return names.sort();
}

const fullDetails = async (name) => {
    return RestaurantModel.find({ name });
}

const alphaFullDetails = async () => {
    alphaNames = await alphabeticalNames();
    return alphaNames.map(fullDetails);
    // return alphaFull;
}


// const alphaFullDetails = async () => {
//     alphaNames = await alphabeticalNames();
//     alphaFull = []
//     await alphaNames.forEach(function(name){
//         alphaFull.push(fullDetails(name))
//     })
//     return alphaFull;
// }

// const alphaFullDetails = async () => {
//     alphaNames = await alphabeticalNames();
//     alphaFull = await alphaNames.forEach(await fullDetails());
//     return alphaFull;
// }

// const alphaFullDetails = async () => {
//     alphaNames = await alphabeticalNames();
//     alphaFull = await alphaNames.map(fullDetails);
//     return alphaFull;
// }

// const alphaFullDetails = async () => {
//     alphaNames = await alphabeticalNames();
//     return alphaNames.map(fullDetails);
// }





// need a method for taking alphabetical name 
//and mapping back to the full name

module.exports = {
    findAll,
    find,
    add,
    del,
    findParticipating,
    restaurantNames,
    alphabeticalNames,
    fullDetails,
    alphaFullDetails
}



//do we have to have "const" before function name?
//the saving happens automatically right?

// const fullDetails = async (name) => {
//     return RestaurantModel.find(resto => resto.name === name);
// } --> why didn't this work?