const { User, Product } = require('../models')

function authorizationAdmin(req, res, next) {
    let userId = +req.loggedUser.id
    let role = req.loggedUser.role
    User.findByPk(userId)
        .then(data => {
            if (data) {
                if (role === 'admin') {
                    next()
                } else {
                    next({name: 'Unauthorized'})
                }
            } else { 
                next({name: 'not found'})
            }
        })
        .catch(err => {
            next({message: err.message})
        })
}

function authorization(req, res, next) {
    let productId = +req.params.id
    let userId = +req.loggedUser.id
    Product.findByPk(productId)
        .then(data => {
            if (data) {
                if (data.UserId === userId) {
                    next()
                } else {
                    next({name: 'Unauthorized'})
                }
            } else {
                next({name: 'Not Found'})
            }
        })
        .catch(err =>{
            next({message: err.message})
        })
}

module.exports = {
    authorizationAdmin,
    authorization
}