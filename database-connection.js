const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/br', { useMongoClient: true })



// BEFORE DOCKER
// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/br', { useMongoClient: true })

// AFTER DOCKER
// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// const connectionString = process.env.DB_URL || 'mongodb://localhost/br'
// mongoose.connect(connectionString, { useMongoClient: true })

