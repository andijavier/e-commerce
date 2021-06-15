const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

// valid user admin
const admin = {
    fullName: 'Admin',
    email: 'admin@mail.com',
    password: '123456',
    role: 'admin'
}

// valid customer
const customer = {
    fullName: 'Customer One',
    email: 'customer@mail.com',
    password: '123456'
}

// email not in db
const notInDb = {
    email: 'noone@mail.com',
    password: '123456'
}

// wrong password
const wrongPass = {
    email: 'customer@mail.com',
    password: '987654'
}

const wrongPass2 = {
    email: 'admin@mail.com',
    password: '987654'
}

// email and password empty
const emptyUser = {
    email: '',
    password: ''
}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

// register test
describe('register success', () => {
    it('register admin return id, email', (done) => {
        return request(app)
            .post('/register')
            .send(admin)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', admin.email)
                expect(body).toHaveProperty('role', admin.role)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('register customer return id, email', (done) => {
        return request(app)
            .post('/register')
            .send(customer)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', customer.email)
                expect(body).toHaveProperty('role', 'customer')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// login test
describe('login success', () => {
    it('login admin return id, email & access_token', (done) => {
        return request(app)
            .post('/loginadmin')
            .send(admin)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', admin.email)
                expect(body).toHaveProperty('access_token', expect.any(String))
                access_token = res.body.access_token
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('login customer return id, email & access_token', (done) => {
        return request(app)
            .post('/logincust')
            .send(customer)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', customer.email)
                expect(body).toHaveProperty('access_token', expect.any(String))
                access_token_cust = res.body.access_token
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('login customer errors', () => {
    it('invalid email', (done) => {
        return request(app)
            .post('/logincust')
            .send(notInDb)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid email/password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('invalid password', (done) => {
        return request(app)
            .post('/logincust')
            .send(wrongPass)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid email/password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('validation error', (done) => {
        return request(app)
            .post('/logincust')
            .send(emptyUser)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['email is required!', 'password is required!'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('login admin errors', () => {
    it('invalid email', (done) => {
        return request(app)
            .post('/loginadmin')
            .send(notInDb)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid email/password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('invalid password', (done) => {
        return request(app)
            .post('/loginadmin')
            .send(wrongPass2)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid email/password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('validation error', (done) => {
        return request(app)
            .post('/loginadmin')
            .send(emptyUser)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['email is required!', 'password is required!'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})