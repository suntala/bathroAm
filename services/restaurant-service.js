const fs = require('fs')
const RestaurantModel = require('../models/restaurant-model')
const haversine = require('haversine')
const configuration = require('../configuration')

/////////////////
const NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    apiKey: configuration.apiKey
};
var geocoder = NodeGeocoder(options);
///////////////


const findAll = async () => {
    return RestaurantModel.find()
}

const add = async (restaurant) => {
    return RestaurantModel.create(restaurant)
}

const del = async (id) => {
    return RestaurantModel.remove({ id })
}

const find = async (id) => {
    return RestaurantModel.findOne({ id })
}

const edit = async (id, data) => {
    const resto = await RestaurantModel.findOne({ id })
    resto.name = data.name
    resto.status = data.status
    resto.neighborhood = data.neighborhood
    resto.openingHours = data.openingHours
    resto.latitude = data.latitude
    resto.longitude = data.longitude
    resto.address = data.address
    resto.website = data.website
    const newresto = await resto.save();
    return newresto;
}

////////////////////

const inputCoo = async (id) => {
    let restaurant = await find(id)
    await geocoder.geocode(`${restaurant.address}, Berlin`, async function(err, res) {
        let first = res[0];
        restaurant.latitude = first.latitude,
        restaurant.longitude = first.longitude,
        await restaurant.save();   
    });
}

const inputHours = async (id, newHours) => {
    let restaurant = await find(id)
    restaurant.openingHours = newHours;
    await restaurant.save();
}
///////////////


const findParticipating = async () => {
    return RestaurantModel.find({status: true})
}


///////////


const alphaRestaurants = async () => {
    participants = await findAll();
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
///////////////


const getAddressCoo = (address) => {
    return new Promise(async (resolve, reject) => {
        await geocoder.geocode(`${address}, Berlin`, async function(err, res) {
            let first = res[0];
            let customer = {
                latitude: first.latitude,
                longitude: first.longitude
            }; 
            resolve(customer)   
        });
    })    
}


const getIdCoo = async (targetId) => {
    let target = await find(targetId);
    let entry = {
        id: targetId,
        latitude: target.latitude,
        longitude: target.longitude
    };
    return entry  
}

///////////////

const findDistance = (customer, restaurant) => {
    let start = {
        latitude: customer.latitude,
        longitude: customer.longitude
    }; 
    let target = restaurant
    let end = {
        latitude: target.latitude,
        longitude: target.longitude
    };
    let distance = haversine(start, end)
    return distance  
}


const findResults = async (time,weekday,address,threshold) => {
    let openRestos = await RestaurantModel.find({
        status: true,
        openingHours: { $elemMatch: {
            weekday: weekday,
            intervals: { $elemMatch: {
                from: { $lte: time },
                to: { $gte: time }
            }}
        }}
    });
    let customer = await getAddressCoo(address);    
    let unsortedResult = openRestos.filter(function(entry) {
        return findDistance(customer,entry) <= threshold
    })
    let result = unsortedResult.sort(function(a, b){return a - b})
    return result
}



const setUpOpeningHours = (weekdays,confirmation,hoursInfo) => {
    let timeFrom1 = hoursInfo[0].replace(':','');
    let timeTo1 = hoursInfo[1].replace(':','');
    let rawHours = []
    for (let i = 0; i < weekdays.length; i++) {
        if (!confirmation) {
            let timeFrom2 = hoursInfo[2].replace(':','');
            let timeTo2 = hoursInfo[3].replace(':','');
            let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1},{from: timeFrom2, to: timeTo2}]}
            rawHours.push(day)
        }
        else {
            let day = {weekday: weekdays[i], intervals: [{from: timeFrom1, to: timeTo1}]}
            rawHours.push(day)
        }
    }
    return rawHours
}


module.exports = {
    findAll,
    find,
    add,
    del,
    edit,
    inputCoo,
    inputHours,  
    alphaRestaurants,
    gatherNeighborhood,
    findParticipating,
    getIdCoo,
    getAddressCoo,
    findDistance,
    findResults,
    setUpOpeningHours
}
