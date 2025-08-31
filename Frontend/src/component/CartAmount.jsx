import React, { useContext } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'

function CartAmount() {
  const { getCartAmount,currency,delivery_fee } = useContext(shopDataContext)

  return (
   <div className='flex items-center justify-center w-full h-[100%] bg-[#0c2025] p-[20px] rounded-lg'>
     <div className='w-full lg:ml-[30px] '>
        <div className='text-xl py-[10px]'>
        <Title text1={"Cart"} text2={"Total"}  />
        </div>
        <div className= "flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]">
            <p className='text-[#f3f9fc] text-[20px]'>SubTotal: <span className='text-[#c1e0e0]'>
                {currency}{getCartAmount()}</span></p>
        </div>
        <div className= "flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]">
            <p className='text-[#f3f9fc] text-[20px]'>Shipping Fee: <span className='text-[#c1e0e0]'>
                {currency}{(delivery_fee)}</span></p>
        </div>
        <div className='flex justify-between items-baseline text-white text-[18px] p-[10px]'>
            <b className='text-[20px]'>Total</b>
            <b className='text-[20px]'>{currency}{getCartAmount()===0?0:(getCartAmount() + delivery_fee)}</b>
            {/* <h1>{getCartAmount()}hello</h1> */}
        </div>
    </div>
   </div>
  )
}

export default CartAmount