const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


const registerUser = asyncHandler(async (req,res) =>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add fields")
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User exists')
    }

    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        name,email,password:hashedPassword 
    })

    if(user){
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Register User")
    }

    res.json({message:"Register User"})
})

const loginUser = asyncHandler(async (req,res) =>{
    const {email,password} =req.body
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
const getUser= asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports={registerUser,loginUser,getUser}