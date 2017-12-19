const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const interval = {
    from: {
        type: Number
    },
    to: {
        type: Number
    }
}

const day = {
    weekday: {
        type: String
    },
    intervals: [interval]
}


const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        // required: true
    },
    neighborhood: {
        type: String
    },
    openingHours: [day],
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String
    },
    website: {
        type: String 
    },
})

RestaurantSchema.plugin(AutoIncrement, { inc_field: 'id' })
RestaurantSchema.index({ id: 1 })
module.exports = mongoose.model('Restaurant', RestaurantSchema)