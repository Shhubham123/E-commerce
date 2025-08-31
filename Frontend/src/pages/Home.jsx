import React from 'react'
import { useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import { useEffect } from 'react'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'


function Home() {   
  let heroData=[
    {text1:"30% off limited offer ",text2:"Style that"},
    {text1:"Discover the best of bold fashion",text2:"Limited time only!"},
    {text1:"Explore our best collection",text2:"Show Now!"},
    {text1:"Choose your Perfect fashion fit",text2:"Now on Sale!"}
  ]
  let [heroCount,setHeroCount]=useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount =>(prevCount ===3?0:prevCount+1))
    },3000)
    return ()=>clearInterval(interval)
  },[])
  return (
    <>
    <div className='overflow-x-hidden relative top-[70px] '>
    <div className='bg-gradient-to-l from-[#141414] to-[#0c2025]  w-[100vw] max-h[100vh]  lg:h-[100vh] md:h-[50vh] sm:h-[30vh] '>
      <Background heroCount={heroCount}/>
      <Hero 
        heroCount={heroCount} 
        setHeroCount={setHeroCount} 
        heroData={heroData[heroCount]}/>
    </div>
    <Product/>
    <OurPolicy/>
    </div>
    </>
  )
}

export default Home