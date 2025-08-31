import React from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { adminDataContext } from '../context/AdminContext';


function Login() {
    let [show,setShow] = useState(false)
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)



  let navigate= useNavigate()

   const AdminLogin = async(e)=>{
    e.preventDefault()
try {
  const result = await axios.post(serverUrl+'/api/auth/adminlogin',{
    email,password
  },{withCredentials:true})
  console.log(result.data);

  getAdmin()
  navigate('/')
  setEmail("")
  setPassword("")
  
} catch (error) {
  console.log(`register error ${error}`);
  setEmail("")
  setPassword("")

}}
 
  return (
    <>
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white
    flex flex-col items-center justify-start' >
    {/* Nav */}
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' >
      <img src={Logo} alt="" className='w-[50px]'  />
      <h1 className='text-[22px] font-sans'>FashionCart</h1>
    </div>
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
      
      <span className='text-[25px] font-semibold'>Login Here</span>
    </div>
    <div className='max-w-[500px] w-[90%] h-[400px] bg-[#000025] border-[1px] border-[#969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center' >

      <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={
        AdminLogin }>
        
        <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

          <input type="email" className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} 
          value={email}/>

          <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} 
          value={password} />
          {!show && <BsEye className='w-[20px] h-[20px] bottom-[50%] right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}
          {show && <BsEyeSlash className='w-[20px] h-[20px] bottom-[50%]  right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}

          <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
          

        </div>
      </form>
    </div>
    </div>
    </>
  )}

export default Login
