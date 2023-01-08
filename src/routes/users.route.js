const express = require('express');
const router = express();
const validation = require('../middlewares/validation')

// import controller
const usersController = require('../controllers/users.controller')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', validation.users, usersController.create)
router.put('/', usersController.update)
router.patch('/:id', usersController.update)
router.delete('/:id', usersController.remove)
// jangan pakai delete karna bisa bentrok dengan method delete built in

module.exports = router