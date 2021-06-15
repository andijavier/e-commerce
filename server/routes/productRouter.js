const router = require('express').Router()
const ProductController = require('../controller/productController')
const { authorizationAdmin } = require('../middlewares/authorization')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)

router.use(authorizationAdmin)
router.post('/', ProductController.postProduct)
router.put('/:id', ProductController.putProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router