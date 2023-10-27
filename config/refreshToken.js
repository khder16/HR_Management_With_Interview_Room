const jwt = require('jsonwebtoken')

const generateRefreshToken = (adminUserName) => {
    try {
        return jwt.sign({ adminUserName }, 'Khder11', {
            expiresIn: "30d"
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = generateRefreshToken
