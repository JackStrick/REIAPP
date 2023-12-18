const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lname: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)