const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

//можем передавать через запятую сколько угодно Middlewares
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
// router.get('/auth', (req, res)=>{
//   res.json({message: 'all'})
// })

module.exports = router
