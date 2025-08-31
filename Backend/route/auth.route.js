import express from 'express'
import { adminLogin, googleLogin, login, logout, register } from '../controller/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/register',register)
authRoute.post('/login',login)
authRoute.get('/logout',logout)
authRoute.post('/googlelogin',googleLogin)
authRoute.post('/adminlogin',adminLogin)

export default authRoute