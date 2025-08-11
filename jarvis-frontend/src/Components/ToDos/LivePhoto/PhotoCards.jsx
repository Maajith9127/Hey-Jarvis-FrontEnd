import React from 'react';
import VerfiyList from './PhotoCardComponenents/VerfiyList.jsx';
import PhotoUpload from './PhotoCardComponenents/PhotoUpload.jsx';


const PhotoCard = ({ photo: photoid }) => {

  return (
    <div className=''>

      <div className='border overflow-y-scroll h-[50%]' >
        <div className='1' >
          {/* PHOTO UPLOAD SECTION */}
          <div className='bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200'>
            <PhotoUpload photoid={photoid} />
          </div>
          {/* VERIFICATION EVENTS SECTION */}

        </div>

      </div>
       <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center'>
            <svg className='w-3 h-3 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-gray-800'>Verification Events</h3>
        </div>
        <VerfiyList photoid={photoid} />
      </div>

    </div>
  );
};

export default PhotoCard;
