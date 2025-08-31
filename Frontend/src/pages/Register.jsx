import React from 'react'
import Logo from '../assets/logo.png'
import Google from '../assets/download.png'
import { useNavigate } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';


function Register() {
  let [show,setShow] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  let [name,setName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let {getCurrentUser}=useContext(userDataContext)


  let navigate= useNavigate()

  const handleRegister = async(e)=>{
    e.preventDefault()
try {
  const result = await axios.post(serverUrl+'/api/auth/register',{
    name,email,password
  },{withCredentials:true})
  console.log(result.data);
  getCurrentUser()
  navigate('/')
  setEmail("")
  setPassword("")
  setName("")
  
} catch (error) {
  console.log(`register error ${error}`);
  setEmail("")
  setPassword("")
  setName("")
  
}

  }
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
    toast.success("Google Login successful");
  } catch (error) {
    console.log(error);
    toast.error("Google Login failed");
  }
}
  return (
    <>
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white
    flex flex-col items-center justify-start'>
    {/* Nav */}
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate('/')}>
      <img src={Logo} alt="" className='w-[50px]'  />
      <h1 className='text-[22px] font-sans'>FashionCart</h1>
    </div>
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
      
      <span className='text-[25px] font-semibold'>Register Here</span>
    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#000025] border-[1px] border-[#969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
      <form className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={handleRegister}>
        <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer pb-2' onClick={ googleSignup}>
          <img src={Google} alt="" className='w-[30px] h-[30px] rounded-full' />Registration with Google
        </div>
        <div className='w-[100%] h-[20x] flex items-center justify-center gap-[10px]'>
          <div className='w-[40%] h-[1px] bg-[#96969635]'></div>OR
          <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
        </div>
        <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
          <input type="text" className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='UserName' required onChange={(e)=>setName(e.target.value)} value={name}/>

          <input type="email" className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

          <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px]  border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>

          {!show && <BsEye className='w-[20px] h-[20px] right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}
          {show && <BsEyeSlash className='w-[20px] h-[20px] right-[5%] absolute' onClick={()=>setShow(prev=>!prev)} />}

          <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
          <p className='flex gap-[10px]'>You have any Account ?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>

        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default Register
