import React from 'react'
import back1  from '../assets/shirtwomen444.jpg'
import back2  from '../assets/shirtwomen44.jpg'
import back3  from '../assets/shirtman44.jpg'
import back4  from '../assets/shirtman4.jpg'

function Background({heroCount}) {
    if(heroCount ===0){
        return <img src={back1} alt="" className='w-[60%] h-[100%] float-right overflow-auto object-cover' />
    }
    else if(heroCount === 1){
        return <img src={back2} alt="" className='w-[60%] h-[100%] float-right overflow-auto object-cover' />
    }
    else if(heroCount === 2){
        return <img src={back3} alt="" className='w-[60%] h-[100%] float-right overflow-auto object-cover' />
    }
    else if(heroCount === 3){
        return <img src={back4} alt="" className='w-[60%] h-[100%] float-right overflow-auto object-cover' />
    }
  
}

export default Background