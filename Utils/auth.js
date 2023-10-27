const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, 'HRMS', { expiresIn: '30d' }); 
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'HRMS'); 
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };