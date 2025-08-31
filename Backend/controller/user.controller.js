import User from "../model/user.model.js"

export const getCurrentUser = async(req,res)=>{
    try {
        let user = await User.findById(req.userId).select("-password")
        if(!user){
             return res.status(400).json({message:"user not found"})
        }
         return res.status(200).json(user)
    } catch (error) {
        console.log("errr getuser",error)
        return res.status(500).json({message:"getCurrentUser error"})
    }
}

export const getAdmin = async(req,res)=>{
    try {
        let adminEmail = req.adminEmail
        if(!adminEmail){
            return res.status(400).json({message:"admin not found"})
        }
        return res.status(200).json({
            email:adminEmail,
            role:"admin"
        })
    } catch (error) {
        console.log('getadmin error',error);
        return res.status(500).json({message:"admin error"})
    }
}