import express from 'express'
import { addToCart, getUserCart, updateToCart } from '../controller/cartController.js'
import isAuth from '../middleware/isAuth.middleware.js'

const cartRoute = express.Router()


cartRoute.post('/get',isAuth,getUserCart)
cartRoute.post('/add',isAuth,addToCart)
cartRoute.post('/update',isAuth,updateToCart)


export default cartRoute