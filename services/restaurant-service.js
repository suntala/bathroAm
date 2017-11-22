const fs = require('fs')
const RestaurantModel = require('../models/restaurant-model')
// const Math = require('math')
const haversine = require('haversine')

/////////////////
const NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google'
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

const findParticipating = async () => {
    return RestaurantModel.find({status: true})
}

const alphaRestaurants = async () => {
    participants = await findAll();
    return participants.sort(function(a, b) {
        return a.name > b.name;
    });    
};

// const alphaRestaurants = async () => {
//     participants = await findParticipating();
//     return participants.sort(function(a, b) {
//         return a.name > b.name;
//     });    
// };

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
//maybe can convert name to key and then that is more clearly a multipurpose function

///////////////


const inputCoo = async (id) => {
    let restaurant = await find(id)
    await geocoder.geocode(`${restaurant.address}, Berlin`, async function(err, res) {
        let array = []
        array = array.concat(res);
        let first = array[0];
        let data = { 
            name: restaurant.name,
            status: restaurant.status,
            neighborhood: restaurant.neighborhood,
            openingHours: restaurant.openingHours,
            latitude: first.latitude,
            longitude: first.longitude,
            address: restaurant.address,
            website: restaurant.website}
        await edit(id, data);      
    });
}

const inputMultiCoo = async (array) => {
    await Promise.all(array.map(inputCoo));
}

const findAddressDetails = (address) => {
    return new Promise(async (resolve, reject) => {
        await geocoder.geocode(`${address}, Berlin`, async function(err, res) {
            let first = res[0];
            let customer = {
                latitude: first.latitude,
                longitude: first.longitude,
                address: address,
                addressBerlin: `${address}, Berlin`,
                formattedAddress: first.formattedAddress
            }; 
            resolve(customer)   
        });
    })    
}

const findDistance = async (address, targetId) => {
    let customer = await findAddressDetails(address);
    let start = {
        latitude: customer.latitude,
        longitude: customer.longitude
    }; 
    let target = await find(targetId);
    let end = {
        latitude: target.latitude,
        longitude: target.longitude
    };
    let distance = haversine(start, end)
    return distance  
}


const getCoo = async (targetId) => {
    let target = await find(targetId);
    let entry = {
        id: targetId,
        latitude: target.latitude,
        longitude: target.longitude
    };
    return entry  
}

const multiDistances = async (address, array) => {
    let customer = await findAddressDetails(address);
    let start = {
        latitude: customer.latitude,
        longitude: customer.longitude
    }; 
    let endPoints = await Promise.all(array.map(getCoo));
    let subHaversine = (entry) => {
        let end = {
            latitude: entry.latitude,
            longitude: entry.longitude
        };
    let distance = {
        id: entry.id,
        distance: haversine(start,end)
    }
        return distance
    }
    let distances = await Promise.all(endPoints.map(subHaversine))
    return distances  
}

const getId = async (entry) => {
    return entry.id
}

const nearToFar = async (address) => {
    let allDetails = await findAll(); 
    let allIds = await Promise.all(allDetails.map(getId));
    distances = await multiDistances(address, allIds);  
    return distances.sort(function(a, b) {
        return a[1] > b[1];
    })
}
//eventually maybe change from findAll to findParticipating
//use getAllIds here

const getAllIds = async () => {
    let allDetails = await findAll(); 
    let allIds = await Promise.all(allDetails.map(getId));
    return allIds
}

const findClosest = async (address, threshold) => {
    let array = await getAllIds();
    let distances = await multiDistances(address, array);
    let selection = distances.filter(function(entry) {
        return entry.distance < threshold;
    })
    return selection
}

const giveName = async (id) => {
    let resto = await find(id);
    return resto.name
}

const giveMultiNames = async (array) => {
    let names = await Promise.all(array.map(giveName));
    return names
}

const displayNames = async (address,threshold) => {
    let selection = await findClosest(address,threshold);
    let selectionIds = await Promise.all(selection.map(getId));
    let final = await giveMultiNames(selectionIds);
    return final
}

const inputHours = async (id,newHours) => {
    let restaurant = await find(id)
    restaurant.openingHours = newHours;
    await restaurant.save();
}

const findOpen = async (time) => {
    let restaurants = await findAll();
    let selection = restaurants.filter(function(entry) {
        return (entry.openingHours[0] <= time) && (time <= entry.openingHours[1])
    })
    return selection
} 
//specify better query

const mapToBigger = async (array) => {
    let ids = await Promise.all(array.map(getId));
    let full = await Promise.all(ids.map(find));
    return full
}

const findClosestFull = async (address, threshold) => {
    let limited = await findClosest(address,threshold);
    let full = await mapToBigger(limited);    
    return full
}

const getSomeIds = async (array) => {
    let arrayIds = await Promise.all(array.map(getId));
    return arrayIds
}

const findNewDistance = (customer, restaurant) => {
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

const findResults = async (time,address,threshold) => {
    let openRestos = await RestaurantModel.find({
        status: true,
        openingHours: { $elemMatch: {
            weekday: 'mon',
            intervals: { $elemMatch: {
                from: { $lte: time },
                to: { $gte: time }
            }}
        }}
    });
    let customer = await findAddressDetails(address);    
    let result = openRestos.filter(function(entry) {
        return findNewDistance(customer,entry) <= threshold
    })
    return result
}


module.exports = {
    findAll,
    find,
    add,
    del,
    edit,
    findParticipating,
    restaurantNames,
    alphaNames,
    fullDetails,
    alphaRestaurants,
    gatherNeighborhood,
    inputCoo,
    inputMultiCoo,
    findDistance,
    getCoo,
    multiDistances,
    findAddressDetails,
    nearToFar,
    getAllIds,
    getId,
    findClosest,
    giveName,
    giveMultiNames,
    displayNames,
    inputHours,
    findOpen,
    findClosestFull,
    findResults,
    mapToBigger,
    getSomeIds,
    findNewDistance
}
//clean up the selection of functions and export list
