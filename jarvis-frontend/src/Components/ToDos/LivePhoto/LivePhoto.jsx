import React, { useState } from 'react';
import PhotoCard from './PhotoCards'; // updated import
import Challenge from './PhotoCardComponenents/Challenge.jsx';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AddPhotoToRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
import { DeletePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
import { UpdatePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
import { deleteEventFromRedux } from '../../../ReduxToolkit/Slices/CalendarSlice';
import AccountabilitiesToVerify from './PhotoCardComponenents/AccountabilitiesToVerify.jsx';

const Photo = () => {

    //To load the Photos from Db
    const [PhotosFromDb, setPhotosFromDb] = useState([])
    useEffect(() => {

        const fetchPhotosFromDb = async () => {
            try {
                const res = await fetch("http://localhost:3000/apiPhotos/GetLivePhotos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                )

                const DbPhotos = await res.json();

                console.log("Db Photos Look Like", DbPhotos);
                setPhotosFromDb(DbPhotos.Photos);

            } catch (error) {

            }

        }
        fetchPhotosFromDb();

        //load data back to redux after refresh
    }, [])

    useEffect(() => {
        PhotosFromDb.forEach(photo => {
            console.log("Photo from Db", photo);
            dispatch(AddPhotoToRedux(photo));
        })
    }, [PhotosFromDb])


    const photos = useSelector((state) => state.photo.Photos);
    const dispatch = useDispatch();

    const deletePhoto = (id) => {
        console.log("Photo to delete", id);
        //To Delete from Live Photo
        dispatch(DeletePhotoFromRedux(id));
        //To Delete all those events from Calendar
        let payload = {
            TodoIdToDeleteAllSuchEventsFromCalendar: id
        }
        dispatch(deleteEventFromRedux(payload))

    };

    const LivePhotos = useSelector((state) => { return state.photo.Photos })
    const SavePhoto = async () => {
        console.log("Save Photo Clicked");
        const res2 = await fetch("http://localhost:3000/apiPhotos/SaveLivePhotos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ LivePhotos: LivePhotos }),
        })

    }
    const addPhoto = () => {
        const uniqueId = uuidv4(); // Generate a unique ID
        const newPhoto = { id: uniqueId, photoName: "Photo Name", PhotoUrl: "" }; // You can replace "Photo Name" with dynamic data if needed
        dispatch(AddPhotoToRedux(newPhoto));
    };

    const handleChange = (id, value) => {
        dispatch(UpdatePhotoFromRedux({ id, newName: value }));
    };

    return (
        <>
            <Challenge />
            <div className='px-10 border border-red-500'>
                <div className='flex gap-x-10 justify-center mb-2'>
                    <button className='border py-5 px-40 rounded-2xl mt-5 ' onClick={addPhoto} type='button'>
                        Add Photo
                    </button>
                    <button onClick={SavePhoto} className='border py-5 px-40 rounded-2xl mt-5 ' type='button'>
                        Save
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
                                <PhotoCard photo={photo.id} />
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
