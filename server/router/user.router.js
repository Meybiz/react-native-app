const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/check', userController.checkUser)
router.get('/user', userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.put('/password', userController.updatePassword)
router.delete('/user/:id', userController.deleteUser)
module.exports = router
