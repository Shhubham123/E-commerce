import mongoose from "mongoose"

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected");
        

    } catch (error) {
        console.log('error in db connection',error);
        
        
    }
}
export default connectDb