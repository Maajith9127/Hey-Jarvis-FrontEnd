import React from 'react'


const LocationCard = ({LocationName}) => {

  return (
    <div className='border w-[80%] py-7 rounded-[25px] text-center'>
        {LocationName}
    </div>
  )
}

export default LocationCard