import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {product} = useContext(shopDataContext)
    let [bestSeller , setBestSeller] = useState([])

    useEffect(()=>{
        let filterProduct = product.filter((item)=>item.bestSeller)
        setBestSeller(filterProduct.slice(3,7))
    },[product])
  return (
    <>
    <div className='h-[8%] w-[100%] text-center mt-[50px] '>
        <Title text1={'Best'} text2={'Seller'} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Tried ,Tested, Loved, Discover Our All-Time Best Solution</p>
    </div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
       {
            bestSeller.map((item,index)=>(
                 <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}  />
                 
            ))
        }
    </div>

    </>
  )
}

export default BestSeller