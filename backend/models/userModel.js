const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please type in your name']
    },
    email: {
        type: String,
        required: [true, 'Please type in your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please type your password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', userSchema )