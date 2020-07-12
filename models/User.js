const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: 'string'
    },
    email: {
        required: true,
        type: 'string',
    },
    password: {
        required: true,
        type: 'string'
    },
    created: {
        default: Date.now,
        type: 'string'
    }
})

module.exports = mongoose.model('User', userSchema);