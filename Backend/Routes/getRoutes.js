const express = require('express')
const {getGoals,setGoals,putGoals,deleteGoals} = require("../Controller/goalController")
const router = express.Router()
const {protect} = require('../MIddleWare/authMiddleware')
router.route('/').get(protect, getGoals).post(protect,setGoals)

router.route('/:id').put(protect,putGoals).delete(protect,deleteGoals)



module.exports=router