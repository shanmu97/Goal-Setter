const express = require('express')
const {registerUser,loginUser,getUser} = require('../Controller/userController')
const router  = express.Router()
const {protect} = require('../MIddleWare/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect, getUser)


module.exports = router