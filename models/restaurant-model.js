const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    neighborhood: {
        type: String,
    },
    openingHours: {
        type: String, //should be number with start and stop
    },
    gpsCoordinates: {
        type: Number,
    },
    address: {
        type: String,
    },
    website: {
        type: String, //what is type of a website?
    },
})

RestaurantSchema.plugin(AutoIncrement, { inc_field: 'id' })
module.exports = mongoose.model('Restaurant', RestaurantSchema)

//is status format ok?