const express = require('express');
const router = express();
const validation = require('../middlewares/validation')

// import controller
const productController = require('../controllers/product.controller')

router.get('/', productController.read)
router.get('/:id', productController.readDetail)
router.post('/', validation.product, productController.create)
router.put('/', productController.update)
router.patch('/:id', productController.update)
router.delete('/:id', productController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router