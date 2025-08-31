import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import image from '../assets/download.jpeg'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import  axios from 'axios'

function Add() {
  let [image1,setImage1] = useState(false)
  let [image2,setImage2] = useState(false)
  let [image3,setImage3] = useState(false)
  let [image4,setImage4] = useState(false)
  let [name,setName] = useState('')
  let [description,setDescription] = useState('')
  let [category,setCategory] = useState('Men')
  let [price,setPrice] = useState('')
  let [subCategory,setSubCategory] = useState('Topwear')
  let [bestSeller,setBestSeller] = useState(false)
  let [size,setSize] = useState([])
  let {serverUrl} =useContext(authDataContext)
  

  const handleAddProduct = async(e)=>{
    e.preventDefault()
    try {
      let formData= new FormData()
      formData.append('name',name)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('category',category)
      formData.append('subCategory',subCategory)
      formData.append('bestSeller',bestSeller)
      formData.append('size',JSON.stringify(size))
      formData.append('image1',image1)
      formData.append('image2',image2)
      formData.append('image3',image3)
      formData.append('image4',image4)

      let result = await axios.post(serverUrl+'/api/product/addproduct',formData,{withCredentials:true,headers: { "Content-Type": "multipart/form-data" }})
      console.log(result.data);
      toast.success("Product added successfully");

      if(result.data){
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("Topwear")

      }
      

    } catch (error) {
      console.log("add product error",error);
      toast.error("Failed to add product");
    }

  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative '>
      <Nav/>
      <Sidebar/>

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]'>
        <form action="" className='w-[100%] md-w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]' onSubmit={handleAddProduct}>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>Add Product Page</div>

          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold '>Upload Images</p>
            <div className='w-[100%] h-[100%] flex items-center justify-start'>

              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image1 ? image: URL.createObjectURL(image1) } alt=""  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id='image1' hidden onChange={(e)=>setImage1(e.target.files[0])} />
              </label>

              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image2 ? image: URL.createObjectURL(image2) } alt=""  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id='image2' hidden onChange={(e)=>setImage2(e.target.files[0])} />
              </label>

              <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image3 ? image: URL.createObjectURL(image3) } alt=""  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id='image3' hidden onChange={(e)=>setImage3(e.target.files[0])} />
              </label>

              <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                <img src={!image4 ? image: URL.createObjectURL(image4) } alt=""  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                <input type="file" id='image4' hidden onChange={(e)=>setImage4(e.target.files[0])} />
              </label>
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold '>Product Name</p>
            <input type="text" placeholder='Type here..' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder-[#ffffffc2]' onChange={(e)=>setName(e.target.value)} value={name} required />
          </div>


          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold '>Product Description</p>
            <textarea type="text" placeholder='Type here..' className='w-[600px] max-w-[98%]  h-[70px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[5px] text-[18px] placeholder-[#ffffffc2]' onChange={(e)=>setDescription(e.target.value)} value={description} required />
          </div>

          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>Product Category</p>
            <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setCategory(e.target.value)} value={category} >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            </div>
      

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>Product Sub-Category</p>
            <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold '>Product Price</p>
            <input type="number" placeholder='₹ 2000' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder-[#ffffffc2]' onChange={(e)=>setPrice(e.target.value)} value={price} min={0} required/>
          </div>

           <div className='w-[60%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>
        <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
        <div className='flex items-center justify-start gap-[15px] flex-wrap'>

          <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("S")? "bg-green-200 text-black border-[#46d1f7]":"bg-slate-600"}`} onClick=
          {()=>setSize(prev=>prev.includes("S")? prev.filter(item =>item!=="S"):[...prev,"S"])}>S</div>

          <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("M")? "bg-green-200 text-black border-[#46d1f7]":"bg-slate-600"}`} onClick=
          {()=>setSize(prev=>prev.includes("M")? prev.filter(item =>item!=="M"):[...prev,"M"])}>M</div>

          <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("L")? "bg-green-200 text-black border-[#46d1f7]":"bg-slate-600"}`} onClick=
          {()=>setSize(prev=>prev.includes("L")? prev.filter(item =>item!=="L"):[...prev,"L"])}>L</div>
          <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("XL")? "bg-green-200 text-black border-[#46d1f7]":"bg-slate-600"}`} onClick=
          {()=>setSize(prev=>prev.includes("XL")? prev.filter(item =>item!=="XL"):[...prev,"XL"])}>XL</div>
          <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${size.includes("XXL")? "bg-green-200 text-black border-[#46d1f7]":"bg-slate-600"}`} onClick=
          {()=>setSize(prev=>prev.includes("XXL")? prev.filter(item =>item!=="XXL"):[...prev,"XXL"])}>XXL</div>
        </div>
      </div>

      <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px] '>
        <input type="checkbox" className='w-[25px] h-[25px] cursor-pointer' id='checkbox' onChange={()=>setBestSeller(prev=>!prev)} />
        <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold '>Add to bestSeller</label>
      </div>

      <button className='w-[140px] px-[10px] py-[15px] rounded-xl bg-[#27a9cd] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white actve:border-[2px] border-white font-semibold'>Add Product</button>


        </form>

      </div>

      
    
    </div>
  )
}

export default Add