const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const { User } = require('../models')

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

// access_token
let access_token = ''
let access_token_cust = ''

beforeAll((done) => {
    User.create(admin)
        .then(user => {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            access_token = jwt.sign(payload, process.env.JWTSECRET)
            return User.create(customer)
        })
        .then(user => {
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            access_token_cust = jwt.sign(payload, process.env.JWTSECRET)
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

// Product Id
let productId = 0

// product data 1
const productData1 = {
    name: 'Drag S Pod Mod',
    image_url: 'https://www.svapem.com/4933-home_default/voopoo-drag-s-60w-pod-mod-kit.jpg',
    price: 335000,
    stock: 6
}

// product data 2
const productData2 = {
    name: 'Exceed Pod Joytech',
    image_url: 'https://www.lepetitvapoteur.com/24924-large_default/exceed-grip-pod-joyetech.jpg',
    price: 182000,
    stock: 12
}

// Empty Product
const emptyProduct = {
    name: '',
    image_url: '',
    price: '',
    stock: ''
}

// product minus
const productMin1 = {
    name: 'Exceed Pod Joytech',
    image_url: 'https://www.lepetitvapoteur.com/24924-large_default/exceed-grip-pod-joyetech.jpg',
    price: 182000,
    stock: -12
}

const productMin2 = {
    name: 'Exceed Pod Joytech',
    image_url: 'https://www.lepetitvapoteur.com/24924-large_default/exceed-grip-pod-joyetech.jpg',
    price: -182000,
    stock: 12
}

// tidak sesuai
const productStock = {
    name: 'Exceed Pod Joytech',
    image_url: 'https://www.lepetitvapoteur.com/24924-large_default/exceed-grip-pod-joyetech.jpg',
    price: 182000,
    stock: 'tiga'
}

// test create product
describe('create product succes case', () => {
    it('success create product', (done) => {
        return request(app)
            .post('/products')
            .send(productData1)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', productData1.name)
                expect(body).toHaveProperty('image_url', productData1.image_url)
                expect(body).toHaveProperty('price', productData1.price)
                expect(body).toHaveProperty('stock', productData1.stock)
                productId = +res.body.id
                done()
            })
            .catch(err => {
                console.log(err);
                done(err)
            })
    })
})

// test error create Product
describe('create product error case', () => {
    it('error no access_token', (done) => {
        return request(app)
            .post('/products')
            .send(productData1)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'must log in')
                done()
            })
            .catch(err => {
                console.log(err);
                done(err)
            })
    })

    it('error not an admin', (done) => {
        return request(app)
            .post('/products')
            .send(productData1)
            .set('Accept', 'application/json')
            .set('access_token', access_token_cust)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log(err);
                done(err)
            })
    })

    it('error validation', (done) => {
        return request(app)
            .post('/products')
            .send(emptyProduct)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'name is required!',
                    'image_url is required!',
                    'image_url must be url format!',
                    'price is required!',
                    'price must be number format',
                    'stock is required!',
                    'stock must be number!'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error negative stock', (done) => {
        return request(app)
            .post('/products')
            .send(productMin1)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'stock must be bigger than 0'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error negative price', (done) => {
        return request(app)
            .post('/products')
            .send(productMin2)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'price must be bigger than 0'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error format stock', (done) => {
        return request(app)
            .post('/products')
            .send(productStock)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'stock must be number!'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// test update product
describe('update product success', () => {
    it('success update', (done) => {
        return request(app)
        .put(`/products/${productId}`)
        .send(productData2)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(res => {
            const { body, status } = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('id' , productId)
            expect(body).toHaveProperty('name' , productData2.name)
            expect(body).toHaveProperty('image_url' , productData2.image_url)
            expect(body).toHaveProperty('price' , productData2.price)
            expect(body).toHaveProperty('stock' , productData2.stock)
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
})

describe('update product errors', () => {
    it('no access token', (done) => {
        return request(app)
        .put(`/products/${productId}`)
        .send(productData2)
        .set('Accept', 'application/json')
        .then(res => {
            const { body, status } = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('message' , 'must log in')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })

    it('not an admin', (done) => {
        return request(app)
        .put(`/products/${productId}`)
        .send(productData2)
        .set('Accept', 'application/json')
        .set('access_token', access_token_cust)
        .then(res => {
            const { body, status } = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('message' , 'Unauthorized')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })

    it('error validation', (done) => {
        return request(app)
            .put(`/products/${productId}`)
            .send(emptyProduct)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'name is required!',
                    'image_url is required!',
                    'image_url must be url format!',
                    'price is required!',
                    'price must be number format',
                    'stock is required!',
                    'stock must be number!',
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error negative stock', (done) => {
        return request(app)
            .put(`/products/${productId}`)
            .send(productMin1)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'stock must be bigger than 0'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error negative price', (done) => {
        return request(app)
            .put(`/products/${productId}`)
            .send(productMin2)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'price must be bigger than 0'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('error format stock', (done) => {
        return request(app)
            .put(`/products/${productId}`)
            .send(productStock)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', [
                    'stock must be number!'
                ])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// test delete product
describe('delete product success', () => {
    it('success deleted product', (done) => {
        return request(app)
            .delete(`/products/${productId}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'product success deleted')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('delete product error', () => {
    it('not an admin', (done) => {
        return request(app)
            .delete(`/products/${productId}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token_cust)
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('no access_token', (done) => {
        return request(app)
            .delete(`/products/${productId}`)
            .set('Accept', 'application/json')
            .then(res => {
                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'must log in')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})