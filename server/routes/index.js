const router = require('express').Router()
const UserController = require('../controller/userController')
const routerProduct = require('./productRouter')
const routerCart = require('./cartRouter')
const authenticate = require('../middlewares/authenticate')

router.post('/register', UserController.register)
router.post('/logincust', UserController.loginCust)
router.post('/loginadmin', UserController.loginAdmin)
router.use(authenticate)
router.use('/products', routerProduct)
router.use('/carts', routerCart)

module.exports = router