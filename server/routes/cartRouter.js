const router = require('express').Router()
const CartController = require('../controller/cartController')

router.get('/', CartController.getCarts)
router.post('/', CartController.addCarts)
router.patch('/', CartController.patchCart)
router.patch('/checkout', CartController.checkout)
router.delete('/', CartController.deleteCartItem)

module.exports = router