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
    },
    subtitle: {
        required: false,
        type: 'string',
        default: '',
    },
    imageLinks: {
        required: false,
        type: 'object',
        default: {},
    },
    description: {
        required: false,
        type: 'string',
        default: '',
    },
    authors: {
        required: false,
        type: 'array',
        default: []
    }
})

module.exports = mongoose.model('Book', bookSchema);