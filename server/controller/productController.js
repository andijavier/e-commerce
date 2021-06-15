const { Product } = require('../models')

class ProductController {
    static getProducts(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProductById(req, res, next) {
        let productId = +req.params.id
        Product.findByPk(productId)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({name: 'Not Found'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static postProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
        }
        Product.create(product)
            .then(data => {
                console.log(data);
                res.status(201).json({
                    id: data.id,
                    name: data.name,
                    image_url: data.image_url,
                    price: data.price,
                    stock: data.stock
                })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }

    static putProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
        }
        const productId = +req.params.id
        Product.update(product, {where: {id: productId}, returning: true})
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static patchProduct(req, res, next) {
        let product = {
            stock: req.body.stock
        }
        const productId = +req.params.id
        Product.update(product, {where: {id: productId}, returning: true})
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let productId = +req.params.id
        Product.destroy({where: {id: productId}})
            .then(data => {
                if (!data) {
                    next({name: 'Not Found'})
                } else {
                    res.status(200).json({message: 'product success deleted'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController