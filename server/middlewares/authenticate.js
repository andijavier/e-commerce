const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

function authenticate(req, res, next) {
    const { access_token } = req.headers
    if (access_token) {
        let decoded = verifyToken(access_token)
        User.findOne({where: {email: decoded.email}})
            .then(user => {
                if (user) {
                    req.loggedUser = {
                        id: decoded.id,
                        email: decoded.email,
                        role: decoded.role
                    }
                    next()
                } else {
                    next({name: 'Invalid login'})
                }
            })
            .catch(err => {
                next({message: err.message})
            })
    } else {
        next({name: 'bad request', message: 'must log in'})
    }
}

module.exports = authenticate