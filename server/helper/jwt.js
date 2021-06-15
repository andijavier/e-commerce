const jwt = require('jsonwebtoken')
const secretToken = process.env.JWTSECRET

function generateToken(payloads) {
    return jwt.sign(payloads,secretToken)
}

function verifyToken(token) {
    return jwt.verify(token,secretToken)
}

module.exports = {
    generateToken,
    verifyToken
}