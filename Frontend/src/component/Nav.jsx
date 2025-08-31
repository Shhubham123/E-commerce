import React from 'react'
import logo from '../assets/logo.png'
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { MdHome } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataContext } from '../context/ShopContext';

function Nav() {
    let {userData,setUserData,getCurrentUser} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let {showSearch,setShowSearch,search,setSearch,getCardCount}= useContext(shopDataContext)
    let [showProfile,setShowProfile]= useState(false)
    let navigate = useNavigate()

    const handleLogout = async()=>{
        try {
            const result = await axios.get(serverUrl + '/api/auth/logout',{withCredentials:true})
            console.log(result.data);
            getCurrentUser()
            navigate('/login')
        
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md'>
        <div className='w-[30%] flex items-center justify-start gap-[10px] '>
            <img src={logo} alt="" className='w-[30px] h-[30px]'/>
            <h1 className='text-[25px] text-black'>FashionCart</h1>
        </div>

        <div className='w-[40%] hidden md:flex'>
            <ul className='flex  items-center justify-center gap-[19px] text-white'>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[20px] py-[10px] rounded-2xl' onClick={()=> navigate('/')}>Home</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[20px] py-[10px] rounded-2xl' onClick={()=> navigate('/collection')}>Collections</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[20px] py-[10px] rounded-2xl' onClick={()=> navigate('/about')}>About</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[20px] py-[10px] rounded-2xl' onClick={()=> navigate('/order')}>Order</li>
            </ul>
        </div>
        <div className='w-[30%] flex items-center justify-end gap-[20px]'>
            <CiSearch  className='w-[38px] h-[38px] txt-[#00000] cursor-pointer' 
            onClick={()=>{setShowSearch(prev=>!prev); navigate('/collection')}}/>
            {!userData && <FaCircleUser className='w-[25px] h-[25px] txt-[#00000] cursor-pointer' onClick={()=>setShowProfile(prev=>!prev)} />}
            {userData && <div className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center text-bold cursor-pointer' onClick={()=>setShowProfile(prev=>!prev)}>{userData.name[0]}</div>}
            <FiShoppingCart className='w-[25px] h-[25px] txt-[#00000] cursor-pointer hidden  md:block'  onClick={()=>navigate('/cart')}/>
            <p className='absolute w-[18px] h-[18px] items-center md:flex justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px]  hidden  md:block'>{getCardCount()}</p>
            { showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
                <input type="text" className='w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white sm:text-[13px]'  placeholder='Search Here.. '
                onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
            </div>}

            {showProfile &&<div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10'>
                <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white]'>
                    {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{
                        navigate('/login')
                        setShowProfile(false)
                    }}>Login</li>}
                    <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=> navigate('/order')}>Orders</li>
                    <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=> navigate('/about')}>About</li>
                    {userData &&<li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{
                        handleLogout()
                        setShowProfile(false)
                    }}>Logout</li>}
                </ul>
                </div>}

                <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
                    <button className='text-[white] flex items-center justify-center flex-col gap-[2px]'> <MdHome className='w-[25px] h-[25px] text-white md:hidden' onClick={()=> navigate('/')} /> Home</button>
                    <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=> navigate('/collection')}> <HiOutlineCollection  className='w-[25px] h-[25px] text-white md:hidden' />Collections</button>
                    <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=> navigate('/contact')}> <MdContacts className='w-[25px] h-[25px] text-white md:hidden' />Order</button>
                    <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate('/cart')}> <FiShoppingCart className='w-[25px] h-[25px] text-white md:hidden' /> Cart <p className='absolute w-[18px] h-[18px] items-center md:flex justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px]  hidden  md:block' >{getCardCount()}</p></button>
                </div>

        </div>
    </div>
  )
}

export default Nav