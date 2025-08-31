import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async(filePath)=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_APIKEY,
        api_secret:process.env.CLOUDINARY_SECRET
    })
    try {
        if(!filePath){
        return null
    }
    const uploadResult = await cloudinary.uploader.upload(filePath)
    console.log(uploadResult);
    
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log('cloudinary error');
    }
}
export default uploadOnCloudinary