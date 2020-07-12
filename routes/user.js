const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const route = express.Router();

const User = require('./../models/User.js');

route.post('/register',async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({name, email, password});
    try{
        const exitingUser = await User.findOne({email: email})
        if(!exitingUser) {
            const salt = await bcrypt.genSalt(10);
            const hashPass= await bcrypt.hash(user.password, salt);
            user.password = hashPass;
            const savedUser = await user.save();
            res.json({ user: savedUser});
        } else {
            //console.log("before error");
            return res.status(400).json({msg: 'User already exists'});
        }
        
    } catch(e) {
        return res.status(500).json({error: e.message });
    }
});

route.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const exitingUser = await User.findOne({email: email})
        if(!exitingUser) return res.status(400).json({errorcode: 40002, msg: 'User does not exists'});
        const isMatch = await bcrypt.compare(password, exitingUser.password);
        if(!isMatch) return res.status(400).json({errorcode: 4001, msg: 'Incorrect Credentials'});
        // console.log(isMatch);
        // res.json({ isMatch})
        const token = jwt.sign({ id: exitingUser.id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                email: exitingUser.email,
                name: exitingUser.name,
            }
        })
    } catch(e) {
        return res.status(500).json({error: e.message });
    }
})

module.exports = route;