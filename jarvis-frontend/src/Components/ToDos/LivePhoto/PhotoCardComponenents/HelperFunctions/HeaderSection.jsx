// components/HeaderSection.jsx
import React from 'react';


export const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 7h4l2-3h6l2 3h4a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 11a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
);

const HeaderSection = ({ onAddPhoto, onSavePhoto }) => {
    return (
        <div className='px-10  py-7 border bg-white border-slate-200 flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>Photo Verification</h1>

            <div className='flex gap-3'>
                <button
                    onClick={onAddPhoto}
                    type='button'
                    className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
                >
                    <CameraIcon />
                    Add Photo
                </button>

                <button
                    onClick={onSavePhoto}
                    type='button'
                    className='bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition'
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default HeaderSection;
