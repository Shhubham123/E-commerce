import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si";
// import { toast } from 'react-toastify'

function Order() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/order/list", {}, { withCredentials: true })
      setOrders(result.data.reverse())
      console.log(result.data)
    } catch (error) {
      // toast.error(error.message)
      console.log(error)
    }
  }
  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl +"/api/order/status", {orderId,status:e.target.value},
        {withCredentials:true})
        if(result.data){
          await fetchAllOrders()
        }
      
    } catch (error) {
      console.log(error);
      
      
      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />

      <div className='w-full h-full flex items-start lg:justify-start justify-center'>
        <Sidebar />
        <div className='lg:w-[85%] md:w-[70%] lg:ml-[310px] md:ml-[70px] flex flex-col gap-8 overflow-hidden py-12 ml-[100px]'>
          <div className='text-[29px] md:text-[40px] mb-[20px]'>All Orders List</div>

          {orders.map((order, index) => (
            <div 
              key={index} 
              className='w-[90%] bg-slate-600 rounded-xl flex flex-col lg:flex-row p-5 gap-6'
            >
              {/* Left icon */}
              <SiEbox className='w-[60px] h-[60px] text-black p-[5px] rounded-lg bg-white shrink-0' />

              {/* Order Details */}
              <div className='flex flex-col lg:flex-row justify-between w-full gap-6'>
                
                {/* Items */}
                <div className='flex flex-col gap-2 text-[16px] text-[#56dbfc]'>
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>
                    </p>
                  ))}
                </div>

                {/* Address */}
                <div className='flex flex-col text-[15px] text-green-100'>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>{order.address.city + " " + order.address.state + " ," + order.address.pincode}</p>
                </div>

                {/* Order Info */}
                <div className='flex flex-col text-[15px] text-[#a1f1f1]'>
                  <p>Items: {order.items.length}</p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p className='text-[25px] font-bold'>₹ {order.amount}</p>
                </div>

                {/* Status Dropdown */}
                <div>
                  <select 
                    value={order.status} 
                    className='px-3 py-2 bg-slate-500 rounded-lg border border-[#96eef3]'
                    onChange={(e) => statusHandler(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
