const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: 'string'
    },
    state: {
        required: true,
        type: 'string'
    },
    userId: {
        required: true,
        type: 'string'
    }
})

module.exports = mongoose.model('Book', bookSchema);