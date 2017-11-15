const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/br', { useMongoClient: true })

// mongoose.connect('mongodb://localhost/wtmbjs', { useMongoClient: true })