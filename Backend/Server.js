const express = require('express')
const dotenv = require('dotenv').config()
const {connectDB}  = require('./config/db')
const {errorHandler} = require('./MIddleWare/errorMiddleware')
const cors = require('cors')

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(cors({origin:'*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require("./Routes/getRoutes"))
app.use('/api/users',require("./Routes/userRoutes"))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

