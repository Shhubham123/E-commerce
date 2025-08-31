import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verfiyRazorpay } from '../controller/order.controller.js'
import isAuth from '../middleware/isAuth.middleware.js'
import adminAuth from '../middleware/adminAuth.middleware.js'

const orderRoute = express.Router()
//user
orderRoute.post('/placeorder', isAuth, placeOrder)
orderRoute.post('/razorpay', isAuth, placeOrderRazorpay)
orderRoute.post('/userorder', isAuth, userOrders)
orderRoute.post('/verifyrazorpay', isAuth, verfiyRazorpay)

//admin
orderRoute.post('/list',adminAuth ,allOrders)
orderRoute.post('/status',adminAuth ,updateStatus)

export default orderRoute