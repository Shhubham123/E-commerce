import express from 'express'
import { getAdmin, getCurrentUser } from '../controller/user.controller.js'
import isAuth from '../middleware/isAuth.middleware.js'
import adminAuth from '../middleware/adminAuth.middleware.js'

const userRoute = express.Router()

userRoute.get('/getcurrentuser',isAuth,getCurrentUser)
userRoute.get('/getadmin',adminAuth,getAdmin)


export default userRoute