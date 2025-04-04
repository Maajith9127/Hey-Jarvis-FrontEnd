import React from 'react'
const Scrollbar = ({hidden}) => {
  return (
    <div  className={`absolute bg-white px-6 py-4 rounded-3xl right-10 bottom-[-45px] border w-[80%] h-[70%] overflow-y-scroll ${hidden ? 'hidden' : ''}`}>

       
        
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>
            <div>Location 1</div>

 
        
        </div>
  )
}

export default Scrollbar