const express = require('express');
const router = express();
const verifyToken = require('../middlewares/verifyToken')
const validation = require('../middlewares/validation')

// import controller
const productController = require('../controllers/product.controller')

router.get('/', productController.read)
router.get('/:id', productController.readDetail)
router.post('/', verifyToken, validation.product, productController.create)
router.patch('/:id', verifyToken, productController.update)
router.delete('/:id', verifyToken, productController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router