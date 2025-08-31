import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name,image,id,price}) {
    let {currency} = useContext(shopDataContext)
    let navigate = useNavigate()
  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[107%] flex items-center justify-center flex-col p-[10px] cursor-pointer borrder-[1px] border-[#80808049]' onClick={()=>navigate(`/productdetail/${id}`)}>
        <img src={image} alt="" className='w-[200px] h-[300px] rounded-sm object-cover' />
        <div className='text-[#c3f6fa] text-[18px] py-[10px] '>{name}</div>
        <div className='text-[#c3f6fa] text-[18px] py-[10px] '>{currency}{price}</div>
        

    </div>
  )
}

export default Card