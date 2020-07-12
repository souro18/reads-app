const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;

//
mongoose.connect(process.env.MONGODB_URI ,
    { useUnifiedTopology: true,
    useNewUrlParser: true }, ()=>{
    console.log("connected");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/user', require('./routes/user.js'));
app.use('/', require('./routes/books.js'));


app.listen(PORT, () => console.log("server started"));;
