import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from './Config/DbConnection.js'
import userRouter from './Routes/UsersRoute.js'
import itemRouter from './Routes/ItemsRoute.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/Users',userRouter)
app.use('/api',itemRouter)

connectMongoDB()

app.listen(process.env.PORT,()=>console.log(`SERVER RUNNING @ ${process.env.PORT}`))