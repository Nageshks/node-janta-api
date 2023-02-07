const mongoose = require('mongoose')
const constants = require('../constants')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    resetToken: String,
    expireToken: Date,
    isVerified: Boolean
}, { timestamps: true })

mongoose.model(constants.user, userSchema)