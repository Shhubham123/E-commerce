import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next)=>{
    try {
        let {token} = req.cookies
    
    if(!token){
        return res.status(400).json({message:"admin token not found"})
    }
    let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        return res.status(400).json({message:"unauthorised login"})
    }
    req.adminEmail = process.env.ADMIN_EMAIL
    next()
    } catch (error) {
        console.log('admin token error',error);
        
        return res.status(500).json({message:"admin token error"})
    }
}
export default adminAuth