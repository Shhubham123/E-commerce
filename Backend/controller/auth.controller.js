import {genToken, genToken1} from "../config/token.js"
import bcrypt from "bcryptjs"
import validator from 'validator'
import User from "../model/user.model.js"



export const register = async(req,res)=>{
    try {
        let {name,email,password} = req.body
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter Valid User"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter Strong Password"})
        }
        let hashPassword = await bcrypt.hash(password,10)
        
        
        
        const user= await User.create({
            name,
            email,
            password:hashPassword
        })

        let token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)
    }
    catch(err){
        console.log('auth register error',err);
        return res.status(500).json({message:error,})
    }
}
export const login = async(req,res)=>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})
        
        
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"})
        }
        let token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)

    } catch (error) {
        console.log("login error",error);
        return res.status(500).json({message:"login error"})
    }
}

export const logout = async(req,res) =>{
    try {
        res.clearCookie("token")
        return res.status(200).json({msg:"logout sucessfully"})
    } catch (error) {
        console.log("logout error",error);
        
       return res.status(500).json({message:"logout error"}) 
    }
}
export const googleLogin = async(req,res)=>{
    try {
        let {name,email} = req.body
         let user = await User.findOne({email})
        
        if(!user){
           let user = await User.create({
            name,email
           })
        }
        
        let token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    } catch (error) {
        console.log("login error",error);
        return res.status(500).json({message:"google login error"})
    }
}


export const adminLogin = async(req,res)=>{
    try {
        let {email,password} = req.body

        if(email == process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(token)

        }
        return res.status(400).json({message:"invalid credentials"})
        
    } catch (error) {
        console.log('error in admin login');
        return res.status(500).json({message:"admin login error"})
        
        
    }
}
