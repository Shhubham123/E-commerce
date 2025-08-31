import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);

  const {serverUrl} = React.useContext(authDataContext);

  const fetchCount = async()=>{
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`,{}, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.get(`${serverUrl}/api/orders/user`,{}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (error) {
      console.log('failed to load fetch count',error);
      
    }
  }
  useEffect(()=>{
    fetchCount();
  },[])
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative'> 
           <Nav/>
        <Sidebar/>
        <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start
        flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[40px] font-semibold text-[#afe2f2]'>Faishon Cart Admin Panel</h1>
        <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div className='border-[#afe2f2]  border-[2px] p-11 rounded-lg shadow-md '>
            <h2 className='text-[23px] '>Total Products</h2>
            <p className='text-2xl'>{totalProducts}</p>
          </div>
          <div className='border-[#afe2f2] border-[2px] p-11 rounded-lg shadow-md'>
            <h2 className='text-[23px] '>Total Orders</h2>
            <p className='text-2xl'>{totalOrders}</p>
            </div>
        </div>
        </div>



    </div>
  )
}

export default Home