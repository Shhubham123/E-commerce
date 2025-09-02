import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import CartAmount from '../component/CartAmount'

function Cart() {
    const { product, currency, cartItem } = useContext(shopDataContext)
    const [cartData, setcartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item]
                    })
                }
            }
        }
        setcartData(tempData)

    }, [cartItem])

    const removeFromCart = (id, size) => {
        const updatedCart = { ...cartItem }
        if (updatedCart[id]) {
            delete updatedCart[id][size]
            if (Object.keys(updatedCart[id]).length === 0) {
                delete updatedCart[id]
            }
        }
        setcartData((prev) => prev.filter((item) => item._id !== id || item.size !== size))
    }
    const updateQuantity = (id, size, quantity) => {
        if (quantity < 1) return; // Prevent setting quantity less than 1
        const updatedCart = { ...cartItem }
        if (updatedCart[id]) {
            updatedCart[id][size] = quantity
        }
        setcartData((prev) =>
            prev.map((item) =>
                item._id === id && item.size === size ? { ...item, quantity } : item
            )
        )
    }

    return (
        <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
            <div className='h-[80%] w-[100%] text-center mt-[80px]'>
                <Title text1={'Your'} text2={'Cart'} />

                <div className='w-[100%] flex flex-col gap-[20px] mt-6'>
                    {
                        cartData.map((item, index) => {
                            const productData = product.find((product) => product._id === item._id)

                            return (
                                <div key={index} className='w-full border-t border-b py-4 relative'>
                                    <div className='flex items-center gap-6 bg-[#51808048] py-3 px-4 rounded-2xl'>
                                        {/* Product Image */}
                                        <img
                                            src={productData.image1}
                                            alt={productData.name}
                                            className='w-[100px] h-[100px] object-cover rounded-lg'
                                        />

                                        {/* Product Details */}
                                        <div className='flex flex-col items-start gap-2'>
                                            <p className='text-[20px] md:text-[25px] text-[#f3f9fc] font-semibold'>
                                                {productData.name}
                                            </p>
                                            <p className='text-[18px] md:text-[20px] text-[#f3f9fc]'>
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className='text-[18px] md:text-[20px] text-[#f3f9fc]'>
                                                {currency}{(productData.price * item.quantity).toFixed(2)}
                                            </p>
                                           <div>
                                             <p className='w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border-[1px]'>
                                                {item.size}
                                            </p>
                                            <input type="number" min={1} defaultValue={item.quantity} onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}  className='md:max-w-20 max-w-10 md:px-2 md:py-2 px-[10px] py-[5px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md text-white' />
                                           </div>
                                        </div>
                                        
                                    </div>

                                    {/* Cross Button */}
                                    <div
                                        className='absolute top-4 right-4 w-[30px] h-[30px] flex items-center justify-center rounded-full text-[#fcf3f7] cursor-pointer border border-transparent text-[26px] m-[10px]'
                                        onClick={() => removeFromCart(item._id, item.size)}
                                    >
                                        X
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-start items-end my-20'>
               <div className='w-full sm:w-[450px] '>
                 <CartAmount/>
                 <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[5px] rounded-2xl text-white flex items-center justify-center gap-[20px]border-[2px] border-[white] ml-[30px] mt-[20px] p-[5px]' onClick={()=>{
                    if(cartData.length>0){
                        navigate('/placeorder')
                    }
                    else{
                        console.log('your cart is empty');
                    }
                 }}>Proceed To Checkout</button>
               </div>

            </div>

        </div>
    )
}

export default Cart
