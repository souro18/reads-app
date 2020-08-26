const express = require('express');
const route = express.Router();
const auth = require('./../middleware/auth');
const Book = require('./../models/Book.js');

route.get('/', (req, res) => {
    res.json({ "id": "it works"});
})
route.get('/books', auth, async (req, res) => {
    try{
    const books = await Book.find({userId: req.id});
    res.json({books})
    } catch(e) {
        return res.status(500).json({error: e.message });
    }
});
route.post('/book', auth, async (req, res) => {
    const book = new Book({
        title: req.body.title,
        state: req.body.state,
        userId: req.id,
        subtitle: req.body.subtitle,
        imageLinks: req.body.imageLinks,
        description: req.body.description,
        authors: req.body.authors,
    })
    try{
        await book.save();
        res.json({ book });
    } catch(e) {
        return res.status(500).json({error: e.message });
    }
});
route.put('/book', auth, async (req, res) => {
    const filter =  { userId: req.id, _id: req.body._id };
    const update = { state: req.body.state };
    try {
       const updatedbook = await Book.findOneAndUpdate(filter, update);
       res.json({ book: updatedbook});
    } catch (e) {
        return res.status(500).json({error: e.message });
    }
})

module.exports = route;