const { Cart, User, Product } = require('../models')

class CartController {
    static getCarts(req, res, next) {
        const userId = +req.loggedUser.id
        Cart.findAll({where: {UserId: userId}, include: Product})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addCarts(req, res, next) {
        const ProductId = +req.body.ProductId
        const quantity = +req.body.quantity
        const userId = +req.loggedUser.id
        let productStock;
        Product.findByPk(ProductId)
            .then(product => {
                if (!product) {
                    let error = {name: 'Not Found'}
                    return error
                } else {
                    productStock = product.stock
                    if (quantity > product.stock) {
                        let error = {name: 'bad request', message: 'stock dont have that much'}
                        return error
                    } else {
                        return Cart.findOne({where: {UserId: userId, ProductId: ProductId, status: 'Unpaid'}})
                    }
                }
            })
            .then(data => {
                console.log(data);
                if (!data) {
                    return Cart.create({ProductId, quantity, UserId: userId})
                } else {
                    if (data.name === 'bad request') {
                        return data
                    } else {
                        if (data.quantity + quantity > productStock) {
                            let error = {name: 'bad request', message: 'stock dont have that much'}
                            return error
                        } else {
                            return Cart.update({quantity: data.quantity + quantity}, {where: {UserId: userId, ProductId: ProductId, status: 'Unpaid'}, returning: true})
                        }
                    }
                }
            })
            .then(data => {
                if (data.name === 'bad request') {
                    next(data)
                } else {
                    res.status(200).json({message: 'successfully added to cart'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static patchCart(req, res, next) {
        const ProductId = +req.body.ProductId
        const quantity = +req.body.quantity
        const userId = +req.loggedUser.id
        let productStock;
        Product.findByPk(ProductId)
            .then(product => {
                productStock = product.stock
                if (quantity > product.stock) {
                    let error = {name: 'bad request', message: 'stock dont have that much'}
                    return error
                } else {
                    return Cart.findOne({where: {UserId: userId, ProductId: ProductId, status: 'Unpaid'}})
                }
            })
            .then(data => {
                if (data.name === 'bad request') {
                    return data
                } else {
                    if (data.quantity + quantity > productStock) {
                        let error = {name: 'bad request', message: 'stock dont have that much'}
                        return error
                    } else {
                        return Cart.update({quantity: data.quantity + quantity}, {where: {UserId: userId, ProductId: ProductId, status: 'Unpaid'}, returning: true})
                    }
                }
            })
            .then(data => {
                if (data.name === 'bad request') {
                    next(data)
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCartItem(req, res, next) {
        const ProductId = +req.body.ProductId
        const userId = +req.loggedUser.id
        Cart.destroy({where: {UserId: userId, ProductId: ProductId}})
            .then(() => {
                res.status(200).json({message: 'Item has successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }

    static checkout(req, res, next) {
        const userId = +req.loggedUser.id
        Cart.findAll({where: {UserId: userId}, include: Product})
            .then(items => {
                items.forEach((el) => {
                    if (el.status !== 'Paid') {
                        el.Product.stock -= el.quantity
                        el.status = 'Paid'
                        el.Product.save()
                        el.save()
                    }
                })
                res.status(200).json({message: 'Your carts has been checkedout'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController