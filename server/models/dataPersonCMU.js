const mongoose = require('mongoose')

const userSchma = mongoose.Schema({
    customerID: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true,
    },
    customerLastname: {
        type: String,
        required: true,
    }, 
    nos: {
        type: Number,
    },
    nosValue: {
        type: Number,
    }});

module.exports = mongoose.model('dcs-cmu-coop-2024', userSchma)