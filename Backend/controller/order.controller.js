import Order from "../model/order.model.js"
import User from "../model/user.model.js"
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()
//for user

const currency = 'inr'


const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

export const placeOrder = async(req, res) => {
    try {
        let {items,amount,address}= req.body
        const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        
        const newOrder = new Order(orderData)
        await newOrder.save()
        res.status(201).json({
            message:"Order placed successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"placeOrder error",
        })
    }
}

export const placeOrderRazorpay = async(req,res)=>{
    try {
        const {items,amount,address}=req.body
        const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const option ={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }
         razorpayInstance.orders.create(option,(error,order)=>{
            if(error){
                console.log(error);
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const verfiyRazorpay = async(req,res)=>{
    try {
        const userId = req.userId
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status ==='paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await User.findByIdAndUpdate(userId,{cartData:{}})
            res.status(200).json({message:"payment Succesfull"})
        }
        else{
            res.json({message:'payment failed'})
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error.message)
    }
}

export const userOrders = async(req,res)=>{
    try {
        const userId = req.userId
        const orders = await Order.find({userId})
        return res.status(200).json({orders})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"userOrders error",
        })
    }
}

// for admin

export const allOrders= async(req,res)=>{
    try {
        const orders=await Order.find({})
        res.status(200).json(orders)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"adminAllOrders errr"})
        
    }
}

export const updateStatus = async(req,res)=>{
    try{
        const {orderId , status} = req.body
        await Order.findByIdAndUpdate(orderId,{status})
        return res.status(201).json({message:"status updated"})

    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}