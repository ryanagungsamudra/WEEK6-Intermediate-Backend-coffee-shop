const express = require('express');
const router = express();

const productRoute = require('./product.route')
const orderRoute = require('./order.route')
const usersRoute = require('./users.route')
const authRoute = require('./auth.route')

router.get('/', (req, res) => {
    return res.send('Backend for yannn coffee shop')
})

router.use('/products', productRoute)
router.use('/order', orderRoute)
router.use('/users', usersRoute)
router.use('/auth', authRoute)

module.exports = router;