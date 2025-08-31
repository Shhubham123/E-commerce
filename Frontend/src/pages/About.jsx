import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.webp'

function About() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-start gap-12 pt-[80px] px-4'>
      
      {/* Title */}
      <Title text1={"About"} text2={"Us"} />

      {/* Content */}
      <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16'>

        {/* Image */}
        <div className='flex justify-center lg:w-1/2 w-full'>
          <img 
            src={about} 
            alt="About FashionCart" 
            className='w-4/5 lg:w-2/3 shadow-md shadow-black rounded-md' 
          />
        </div>

        {/* Text */}
        <div className='flex flex-col lg:w-1/2 w-full max-w-[800px] gap-6 text-left'>
          <p className='text-white text-base md:text-lg'>
            Welcome to <strong>Fashion Cart</strong>, your one-stop destination for all things stylish and trendy. At Fashion Cart, we believe that fashion is more than just clothing—it’s a way to express your personality and confidence. Our platform offers a carefully curated selection of clothing, accessories, and footwear for men, women, and kids, ensuring there’s something for everyone. We focus on providing high-quality products at competitive prices, making online shopping seamless and enjoyable.
          </p>
          <p className='text-white text-base md:text-lg'>
            Our mission is to bring the latest trends right to your fingertips, backed by exceptional customer service and a hassle-free shopping experience. Whether you’re looking for casual wear, office attire, or statement pieces for special occasions, Fashion Cart has you covered. Join us in celebrating style, comfort, and individuality, and let your wardrobe reflect who you truly are.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
