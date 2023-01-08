const express = require('express');
const router = express();
const validation = require('../middlewares/validation')

// import controller
const orderController = require('../controllers/order.controller')

router.get('/', orderController.read)
router.get('/:id', orderController.readDetail)
router.post('/', validation.order, orderController.create)
router.put('/', orderController.update)
router.patch('/:id', orderController.update)
router.delete('/:id', orderController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router