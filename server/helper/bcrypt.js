const bcrypt = require('bcrypt')

function encryptPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, 8)
}

function comparePassword(plainPassword, password) {
    return bcrypt.compareSync(plainPassword, password)
}

module.exports = {
    encryptPassword,
    comparePassword
}