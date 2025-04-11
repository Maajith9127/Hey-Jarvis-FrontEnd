import React from 'react';

const PhotoCard = ({ photoName }) => {
  return (
  
  

  <div className='flex  gap-5 py-4'>
{/* PHOTO PLACE */}
    <div className='border w-[40%]  py-20 rounded-[25px] text-center'>
      {photoName}
    </div>

{/* VERFICATION */}
    <div className='border w-[40%] rounded-[25px] py-20 '>
      
      
    </div>
  </div>
  
  
  
 
    
    
    
  );
};

export default PhotoCard;
