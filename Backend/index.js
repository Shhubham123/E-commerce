import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoute from './route/auth.route.js'
import cors from 'cors'
import userRoute from './route/user.route.js'
import productRoute from './route/product.route.js'
import cartRoute from './route/cart.route.js'
import orderRoute from './route/order.route.js'


const app =express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:["https://e-commerce-frontend-53ve.onrender.com","https://e-commerce-admin-057b.onrender.com"],
    credentials:true
}))

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log('server is running',port);
    connectDb();
    
})
