import React from 'react'
import Title from './Title'
import { MdCurrencyExchange } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[100vh] md:min-h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 pt-[70px]'>
      
      {/* Title */}
      <div className='text-center w-full px-4'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-blue-100 text-[13px] md:text-[20px] mt-2'>
          Customer-friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policies */}
      <div className='w-full flex flex-wrap justify-center gap-12 lg:gap-16 px-4'>
        {/* Single Policy */}
        <div className='w-[400px] max-w-[90%] flex flex-col items-center justify-start gap-4 text-center'>
          <MdCurrencyExchange className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>
            Easy Exchange Policy
          </p>
          <p className='text-[white] text-sm md:text-lg font-light'>
            Exchange Made Easy - Quick, Simple, and Customer-Friendly Process
          </p>
        </div>

        <div className='w-[400px] max-w-[90%] flex flex-col items-center justify-start gap-4 text-center'>
          <RiDiscountPercentFill  className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>
            7 Days Return Policy
          </p>
          <p className='text-[white] text-sm md:text-lg font-light'>
           Shop with confidence - 7 days Easy Return Guarentee.
          </p>
        </div>

        <div className='w-[400px] max-w-[90%] flex flex-col items-center justify-start gap-4 text-center'>
           <BiSupport className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
          <p className='text-[#a5e8f7] font-semibold text-lg md:text-2xl'>
            Best Customer Support
          </p>
          <p className='text-[white] text-sm md:text-lg font-light'>
            Trusted Customer Support - Your Satisfaction is Our Priority.
          </p>
        </div>

      
      </div>
    </div>
  )
}

export default OurPolicy
