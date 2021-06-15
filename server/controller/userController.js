const { User, Cart, Product } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register(req, res, next) {
        const { email, password, fullName, role } = req.body
        User.create({email, password, fullName, role})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    role: data.role
                })
            })
            .catch(err => {
                if (err.errors[0].type === 'unique violation') {
                    next({message: 'Email/username already exists'})
                } else {
                    next({message: err.message});
                }
            })
    }

    static loginCust(req, res, next) {
        const { email, password } = req.body
        let notValid = []
        if (!email.length) {
            notValid.push({message: 'email is required!'})
        }
        if (!password.length) {
            notValid.push({message: 'password is required!'})
        }
        if (notValid.length) {
            console.log(notValid);
            next({
                name: 'SequelizeValidationError',
                errors: notValid
            })
        }
        User.findOne({where: {email: email}})
            .then(data => {
                if (data) {
                    console.log(data.role);
                    if (data.role === 'customer') {
                        let loginSuccess = comparePassword(password, data.password)
                        if (loginSuccess) {
                            const token = generateToken({
                                id: data.id,
                                email: data.email,
                                role: data.role
                            })
                            res.status(200).json({
                                access_token: token,
                                id: data.id,
                                email: data.email
                            })
                        } else {
                            next({name: 'Invalid Login'})
                        }
                    } else {
                        next({name: 'bad request', message: 'customer only'})
                    }
                } else {
                    next({name: 'Invalid Login'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginAdmin(req, res, next) {
        const { email, password } = req.body
        let notValid = []
        if (!email.length) {
            notValid.push({message: 'email is required!'})
        }
        if (!password.length) {
            notValid.push({message: 'password is required!'})
        }
        if (notValid.length) {
            console.log(notValid);
            next({
                name: 'SequelizeValidationError',
                errors: notValid
            })
        }
        User.findOne({where: {email: email}})
            .then(data => {
                if (data) {
                    if (data.role === 'admin') {
                        let loginSuccess = comparePassword(password, data.password)
                        if (loginSuccess) {
                            const token = generateToken({
                                id: data.id,
                                email: data.email,
                                role: data.role
                            })
                            res.status(200).json({
                                access_token: token,
                                id: data.id,
                                email: data.email
                            })
                        } else {
                            next({name: 'Invalid Login'})
                        }
                    } else {
                        next({name: 'bad request', message: 'admin only'})
                    }
                } else {
                    next({name: 'Invalid Login'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static googlelogin(req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({where: {email: email}})
        }).then(user => {
            if (user) {
                return user
            } else {
                let name = email.split('@')
                return User.create({
                    email: email,
                    password: `${Math.random() * 10000}4tTh5ho5u4bk`,
                    fullName: name[0]
                })
            }
        }).then(user => {
            const token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })
            res.status(200).json({
                access_token: token,
                id: data.id,
                email: data.email
            })
        }).catch(err => {
            console.log(err);
            next({message: err.message})
        })
        
    }
}

module.exports = UserController