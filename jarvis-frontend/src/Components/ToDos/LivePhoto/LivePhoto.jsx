import React, { useState } from 'react';
import PhotoCard from './PhotoCards'; // updated import
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { AddPhotoToRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
import { DeletePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
import { UpdatePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';

const Photo = () => {

    const photos = useSelector((state) => state.photo.Photos);
    const dispatch = useDispatch();

    const deletePhoto = (id) => {
        console.log("Photo to delete", id);
        dispatch(DeletePhotoFromRedux(id))
    };

    const addPhoto = () => {
        const uniqueId = uuidv4(); // Generate a unique ID
        const newPhoto = { id: uniqueId, photoName: "Photo Name" }; // You can replace "Photo Name" with dynamic data if needed
        dispatch(AddPhotoToRedux(newPhoto));
    };

    const handleChange = (id, value) => {
        dispatch(UpdatePhotoFromRedux({ id, newName: value }));
    };

    return (
        <>
            <div className='px-10'>
                <div className='flex justify-center mb-2'>
                    <button className='border py-5 px-40 rounded-2xl mt-5 ' onClick={addPhoto} type='button'>
                        Add Photo
                    </button>
                </div>
                <div className='Photo-Card-Holder flex-col border rounded-[25px] overflow-y-scroll h-[87vh]  gap-3'>
                    {photos.map((photo) => (
                        <div key={photo.id} className='flex justify-between items-center  px-7'>
                            <div className='w-[90%]'>
                                <input
                                    placeholder='Enter Photo Name'
                                    type="text"
                                    value={photo.photoName}
                                    onChange={(event) => handleChange(photo.id, event.target.value)}
                                />
                                <PhotoCard photo={photo} />
                            </div>
                            <button type='button' className='border py-4 px-10 rounded-[20px] ' onClick={() => deletePhoto(photo.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Photo;
