const mongoose = require('mongoose')

const userSchma = mongoose.Schema({
    urlServer: String
})

module.exports = mongoose.model('URL-Server', userSchma)