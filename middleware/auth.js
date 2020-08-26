const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(!token) return res.status(401).json({msg: 'no Unauthenticated request'});
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.status(401).json({msg: 'Unauthenticated token'});
        req.id = verified.id;
        next();
    } catch(e) {
        return res.status(500).json({error: e.message });
    }
    
}

module.exports = auth;