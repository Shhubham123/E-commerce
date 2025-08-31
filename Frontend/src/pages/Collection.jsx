import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa"
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collection() {
  const [showFilter, setShowFilter] = useState(false)
   let {product,search,showSearch} = useContext(shopDataContext)
   let [filterProduct,setFilterProduct] = useState([])
   let [category,setCategory] = useState([])
   let [subCategory,setSubCategory] = useState([])
   let [sortType,setSortType]= useState("relavent")

   const ToggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item!=e.target.value))
        }
        else{
            setCategory(prev =>[...prev,e.target.value])
        }
   }
   const ToggleSubCategory = (e)=>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item!=e.target.value))
        }
        else{
            setSubCategory(prev =>[...prev,e.target.value])
        }
   }

   const applyFilter = ()=>{
    let productCopy = product.slice()

    if(showSearch && search){
        productCopy=product.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if(category.length>0){
        productCopy = productCopy.filter(item => category.includes(item.category)) 
    }
    if(subCategory.length>0){
        productCopy = productCopy.filter(item => subCategory.includes(item.subCategory)) 
    }
    setFilterProduct(productCopy)
   }

   const sortProduct = (e)=>{
    let filterProductCopy = filterProduct.slice()

    switch(sortType){
        case 'low-high':
            setFilterProduct(filterProductCopy.sort((a,b)=>(a.price-b.price)))
        break;
        case 'high-low':
            setFilterProduct(filterProductCopy.sort((a,b)=>(b.price-a.price)))
        break;
        default:
            filterProduct
        break;
    }
   }
   useEffect(()=>{
    sortProduct()
   },[sortType])

   useEffect(()=>{
    setFilterProduct(product)
   },[product])
   useEffect(()=>{
    applyFilter()
   },[category,setCategory,product,search,showSearch])

  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#353434] to-[rgb(12,32,37)] flex flex-col md:flex-row items-start justify-start pt-[70px] overflow-x-hidden z-[2] pb-[100px]'>

      {/* Sidebar */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilter ? "h-[45vh]" : "h-[8vh]"} p-[20px] border-r border-gray-400 text-[#aaf5fa] lg:fixed`}>
        
        {/* Toggle */}
        <p 
          className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer'
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className='text-[18px] md:hidden' />}
          {showFilter && <FaChevronDown className='text-[18px] md:hidden' />}
        </p>

        {/* Categories */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>Categories</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px]'>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Men"} className='w-3' onChange={ToggleCategory} /> Men</label>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Women"} className='w-3' onChange={ToggleCategory} /> Women</label>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Kids"} className='w-3' onChange={ToggleCategory} /> Kids</label>
          </div>
        </div>

        {/* Sub-Categories */}
        <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa]'>Sub-Categories</p>
          <div className='w-[230px] h-[120px] flex flex-col gap-[10px]'>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Topwear"} className='w-3' onChange={ToggleSubCategory}  /> Topwear</label>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Bottomwear"} className='w-3' onChange={ToggleSubCategory} /> Bottomwear</label>
            <label className='flex items-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={"Winterwear"} className='w-3' onChange={ToggleSubCategory} /> Winterwear</label>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className='lg:pl-[20%] md:py-[10px] flex-1'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1="All" text2="Collections" />
          <select name="" id="" className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px]' onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavent" className='w-[100%]  h-[100%]'>Sort by: Relavent</option>
            <option value="low-high" className='w-[100%] h-[100%]'>Sort by: Low to High</option>
            <option value="high-low" className='w-[100%] h-[100%]'>Sort by: High to low</option>
          </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
            {
                filterProduct.map((item,index)=>(
                     <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}  />
                ))
            }

        </div>
      </div>
    </div>
  )
}

export default Collection
