import React from 'react'
import Logo from '../assets/logo.png'
import Google from '../assets/download.png'
import { useNavigate } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';

function Login() {
    let [show,setShow] = useState(false)
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)


  let navigate= useNavigate()

   const handleLogin = async(e)=>{
    e.preventDefault()
try {
  const result = await axios.post(serverUrl+'/api/auth/login',{
    email,password
  },{withCredentials:true})
  console.log(result.data);
  toast.success("Login successful");
  getCurrentUser()
  navigate('/')
  setEmail("")
  setPassword("")
  
} catch (error) {
  console.log(`register error ${error}`);
  toast.error("Login failed");
  setEmail("")
  setPassword("")
  
}}
 const googleSignup= async()=>{
  try {
    const response = await signInWithPopup(auth,provider)
    console.log(response);
    let user = response.user
    let name = user.displayName
    let email = user.email

    const result = await  axios.post(serverUrl+"/api/auth/googlelogin",{
      name,email
    },{withCredentials:true})
    console.log(result.data);
    getCurrentUser()
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}
  return (
    <>
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white
    flex flex-col items-center justify-start' >
    {/* Nav */}
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate('/')}>
      <img src={Logo} alt="" className='w-[50px]'  />
      <h1 className='text-[22px] font-sans'>FashionCart</h1>
    </div>
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
      
      <span className='text-[25px] font-semibold'>Login Here</span>
    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#000025] border-[1px] border-[#969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center' >
      <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={handleLogin}>
        <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer pb-2' onClick={googleSignup}>
          <img src={Google} alt="" className='w-[30px] h-[30px] rounded-full' />Login with Google
        </div>
        <div className='w-[100%] h-[20x] flex items-center justify-center gap-[10px]'>
          <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR
          <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
        </div>
        <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>

          <input type="email" className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} 
          value={email}/>

          <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} 
          value={password} />
          {!show && <BsEye className='w-[20px] h-[20px] bottom-[56%] right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}
          {show && <BsEyeSlash className='w-[20px] h-[20px] bottom-[56%]  right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}

          <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
          <p className='flex gap-[10px]'>You have no Account ?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate('/register')}>New Registration</span></p>

        </div>
      </form>
    </div>
    </div>
    </>
  )}

export default Login