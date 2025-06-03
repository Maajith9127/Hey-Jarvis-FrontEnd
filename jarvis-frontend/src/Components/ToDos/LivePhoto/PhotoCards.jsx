import React from 'react';
import VerfiyList from './PhotoCardComponenents/VerfiyList.jsx';
import PhotoUpload from './PhotoCardComponenents/PhotoUpload.jsx';


const PhotoCard = ({ photo: photoid }) => {
  
  return (
    <div className='flex border border-green-500 gap-5 py-4'>
      {/* PHOTO PLACE */}
      <div className='border w-[40%] py-20 rounded-[25px] text-center'>
      <PhotoUpload photoid={photoid}/>
      </div>
      {/* VERIFICATION */}
      <VerfiyList  photoid={photoid} />
  
    </div>
  );
};

export default PhotoCard;
