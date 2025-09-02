// import jwt from "jsonwebtoken"

// const isAuth = async(req,res,next)=>{
//     try {
//         let {token} = req.cookies
        

//         if(!token){
//             return res.status(400).json({message:"user does not have token"})
//         }
//         let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

//         if(!verifyToken){
//             return res.status(400).json({message:"user does not have token"}) 
//         }
//         console.log(verifyToken);
        

//         req.userId = verifyToken.userId
//         next()
//     } catch (error) {
//         console.log('isAuth middleware error');
        
//          return res.status(500).json({message:"isAuth err"})
//     }

// }
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If no cookie, check headers
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId || verifyToken.email; // admin uses email
    next();
  } catch (error) {
    console.error("isAuth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;


// export default isAuth
