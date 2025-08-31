import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartAmount from '../component/CartAmount'
import razorpay from '../assets/razorpay.png'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
    const {cartItem,setCartItem,getCartAmount,delivery_fee,product} = useContext(shopDataContext)
    let {serverUrl} =useContext(authDataContext)
    let navigate = useNavigate()
    let [method,setMethod]= useState("cod")
    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode:'',
        country:'',
        phone:''
    });

    const onChangeHandler = (e)=>{
        const { name, value } = e.target;
        setFormData(data => ({...data,[name]: value}))
    }

    const initPay = (order)=>{
        const options ={
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount:order.amount,
            currency:order.currency,
            name:'Order Payment',
            description:"Order Payment",
            order_id:order.id,
            handler: async function (response){
                console.log(response); 
                let {data} = await axios.post(serverUrl + "/api/order/verifyrazorpay", response , 
                    { withCredentials: true })
                    if(data){
                        navigate('/order')
                        setCartItem({})
                        toast.success("Payment successful");
                    }
            }

            
        }
        const rzp = new window.Razorpay(options)
            rzp.open()
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(product);
        
        try {
    
            
            let orderItems =[]
            for(const items in cartItem){
                for(const item in cartItem[items] ){
                    if(cartItem[items][item]>0){
                        const itemInfo = structuredClone(product.find((product) => product._id === items));
                        if(itemInfo){
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                            console.log(itemInfo);
                            
                        }
                }
                }
                console.log(orderItems);
                
            }
            let orderData = {
                address:formData,
                items:orderItems,
                amount:getCartAmount()+delivery_fee

            }
            switch(method){
                case 'cod':
                    const result= await axios.post(serverUrl+"/api/order/placeorder", orderData,{withCredentials:true})
                    console.log(result.data);
                    if(result.data){
                        setCartItem({})
                        navigate('/order')
                    }
                    else{
                        console.log(result.data.message);
                    }
                    break;

                    case 'razorpay':
                        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
                        console.log(resultRazorpay);
                        
                        
                        if (resultRazorpay.data) {
                            initPay(resultRazorpay.data);
                        }
                        break;
                    default:
                        break;

            }

        } catch (error) {
            console.log(error);
            toast.error("Order placement failed");
            
            
        }
        
    }
    

  return (
    
     <div>
            <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-12 md:py-8 relative">
                <div className="w-full md:w-1/2 flex items-center justify-center mt-16 md:mt-0">
                    <form className="w-full max-w-lg p-4">
                        <div className="py-4">
                            <h2 className="text-2xl font-bold text-white">
                                <span className="text-blue-500">DELIVERY</span> INFORMATION
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='firstName' value={formData.firstName}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='lastName' value={formData.lastName}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='email' value={formData.email}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Street"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='street' value={formData.street}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='city' value={formData.city}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='state' value={formData.state}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Pincode"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='pincode' value={formData.pincode}
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='country' value={formData.country}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-white text-lg px-4 shadow-sm shadow-[#343434] focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                required
                                onChange={onChangeHandler} name='phone' value={formData.phone}
                            />
                        </div>
                    </form>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-lg p-4 flex flex-col items-center lg:mt-[50px]">
                        <CartAmount />

                        <div className="py-4 w-full">
                            <h2 className="text-2xl font-bold text-white text-center">
                                <span className="text-blue-500">PAYMENT</span> METHOD
                            </h2>
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-6 my-6">
                            <button onClick={()=>setMethod('razorpay')} className={`w-[150px] h-[50px]  rounded-sm ${method==='razorpay'?'border-[5px] scale-[1.3] mr-[10px] border-blue-900 rounded-sm':''}`} >
                                <img src={razorpay} alt=""  className='w-[100%] h-[100%] object-fill rounded-sm '/>
                            </button>
                            <button onClick={()=>setMethod('cod')} className={`w-[200px] h-[50px]  rounded-sm ${method==='cod'?'border-[5px] scale-[1.2] font-semibold bg-[white] border-blue-900 rounded-sm':' font-semibold bg-[white]'}`}>
                                CASH ON DELIVERY
                            </button>
                        </div>

                        <button className="w-full md:w-2/3 lg:w-1/2 h-12 rounded-md bg-blue-900 text-white text-lg font-medium shadow-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/40 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[45px]" onClick={onSubmitHandler}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>



// <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
    //     <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
    //         <form action="" className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
    //             <div className='py-[10px]'>
    //                 <Title text1={'DELIVERY'} text2={"INFORMATION"} />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='First Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //                 <input type="text" placeholder='Last Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='Email Address' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //                 <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //                 <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
    //             <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
    //                 <input type="text" placeholder='Phone Number' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
    //             </div>
                
    //         </form>
    //     </div>
    //      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
    //             <div className='lg:w-[80%] w-[90%] min-h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
    //                 <CartAmount/>
    //                 <div className='py-[10px]'>
    //                     <Title text1={'PAYMENT'} text2={"METHOD"} />
    //                 </div>
    //                 <div className='w-[100%] h-[10vh] lg:h-[100px] flex item-center justify-center mt-[20px] lg:mt-[0px] gap-[50px]'>
    //                     <button onClick={()=>setMethod('razorpay')} className={`w-[150px] h-[50px]  rounded-sm ${method==='razorpay'?'border-[5px] scale-[1.3+] border-blue-900 rounded-sm':''}`}>
    //                         <img src={razorpay} alt=""  className='w-[100%] h-[100%] object-fill rounded-sm '/>
    //                     </button>
    //                     <button  onClick={()=>setMethod('cod')} className={`w-[200px] h-[50px]  rounded-sm ${method==='cod'?'border-[5px] scale-[1.2] font-semibold bg-[white] border-blue-900 rounded-sm':' font-semibold bg-[white]'}`}>
    //                         CASH ON DELIVERY
    //                     </button>
                        
    //                 </div>
    //                <button className='w-full sm:w-[60%] md:w-[40%] lg:w-[25%] h-[50px] mt-[20px] rounded-md bg-blue-900 text-white text-[18px] shadow-sm shadow-[#343434] transition-transform duration-200 hover:scale-105'>
    //                     Place Order
    //                 </button>

    //             </div>
    //         </div>

    // </div>

  )
}

export default PlaceOrder