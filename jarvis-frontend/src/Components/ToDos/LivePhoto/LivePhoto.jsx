// import React, { useState } from 'react';
// import PhotoCard from './PhotoCards'; // updated import
// import Challenge from './PhotoCardComponenents/Challenge.jsx';

// import { v4 as uuidv4 } from 'uuid';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

// import { AddPhotoToRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// import { DeletePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// import { UpdatePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// import { deleteEventFromRedux } from '../../../ReduxToolkit/Slices/CalendarSlice';
// import HeaderSection from './PhotoCardComponenents/HelperFunctions/HeaderSection.jsx';

// const Photo = () => {

//     //To load the Photos from Db
//     const [PhotosFromDb, setPhotosFromDb] = useState([])
//     useEffect(() => {

//         const fetchPhotosFromDb = async () => {
//             try {
//                 const res = await fetch("http://localhost:3000/apiPhotos/GetLivePhotos", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//                 )

//                 const DbPhotos = await res.json();

//                 console.log("Db Photos Look Like", DbPhotos);
//                 setPhotosFromDb(DbPhotos.Photos);

//             } catch (error) {

//             }

//         }
//         fetchPhotosFromDb();

//         //load data back to redux after refresh
//     }, [])

//     useEffect(() => {
//         PhotosFromDb.forEach(photo => {
//             console.log("Photo from Db", photo);
//             dispatch(AddPhotoToRedux(photo));
//         })
//     }, [PhotosFromDb])


//     const photos = useSelector((state) => state.photo.Photos);
//     const dispatch = useDispatch();

//     const deletePhoto = (id) => {
//         console.log("Photo to delete", id);
//         //To Delete from Live Photo
//         dispatch(DeletePhotoFromRedux(id));
//         //To Delete all those events from Calendar
//         let payload = {
//             TodoIdToDeleteAllSuchEventsFromCalendar: id
//         }
//         dispatch(deleteEventFromRedux(payload))

//     };

//     const LivePhotos = useSelector((state) => { return state.photo.Photos })
//     const SavePhoto = async () => {
//         console.log("Save Photo Clicked");
//         const res2 = await fetch("http://localhost:3000/apiPhotos/SaveLivePhotos", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ LivePhotos: LivePhotos }),
//         })

//     }
//     const addPhoto = () => {
//         const uniqueId = uuidv4(); // Generate a unique ID
//         const newPhoto = { id: uniqueId, photoName: "Photo Name", PhotoUrl: "" }; // You can replace "Photo Name" with dynamic data if needed
//         dispatch(AddPhotoToRedux(newPhoto));
//     };

//     const handleChange = (id, value) => {
//         dispatch(UpdatePhotoFromRedux({ id, newName: value }));
//     };

//     return (
//         <>
//             <Challenge />
//             <div className='min-h-screen bg-gray-50 px-6 py-8'>
//                 <HeaderSection onAddPhoto={addPhoto} onSavePhoto={SavePhoto} />
//                 <div className='max-w-4xl mx-auto mt-8'>
//                     <div className='space-y-6'>
//                         {photos.map((photo) => (
//                             <div key={photo.id} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
//                                 <div className='p-6'>
//                                     <div className='flex items-center justify-between mb-4'>
//                                         <input
//                                             placeholder='Enter Photo Name'
//                                             type="text"
//                                             value={photo.photoName}
//                                             onChange={(event) => handleChange(photo.id, event.target.value)}
//                                             className='text-lg font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 focus:px-2 focus:py-1 focus:rounded-md transition-all duration-200 flex-1'
//                                         />
//                                         <button 
//                                             type='button' 
//                                             className='text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-all duration-200 text-sm font-medium' 
//                                             onClick={() => deletePhoto(photo.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                     <PhotoCard photo={photo.id} />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Photo;






// // import React, { useState } from 'react';
// // import PhotoCard from './PhotoCards'; // updated import
// // import Challenge from './PhotoCardComponenents/Challenge.jsx';

// // import { v4 as uuidv4 } from 'uuid';
// // import { useDispatch } from 'react-redux';
// // import { useSelector } from 'react-redux';
// // import { useEffect } from 'react';

// // import { AddPhotoToRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// // import { DeletePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// // import { UpdatePhotoFromRedux } from '../../../ReduxToolkit/Slices/PhotoSlice';
// // import { deleteEventFromRedux } from '../../../ReduxToolkit/Slices/CalendarSlice';
// // import HeaderSection from './PhotoCardComponenents/HelperFunctions/HeaderSection.jsx';

// // const Photo = () => {

// //     //To load the Photos from Db
// //     const [PhotosFromDb, setPhotosFromDb] = useState([])
// //     useEffect(() => {

// //         const fetchPhotosFromDb = async () => {
// //             try {
// //                 const res = await fetch("http://localhost:3000/apiPhotos/GetLivePhotos", {
// //                     method: "GET",
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     },
// //                 }
// //                 )

// //                 const DbPhotos = await res.json();

// //                 console.log("Db Photos Look Like", DbPhotos);
// //                 setPhotosFromDb(DbPhotos.Photos);

// //             } catch (error) {

// //             }

// //         }
// //         fetchPhotosFromDb();

// //         //load data back to redux after refresh
// //     }, [])

// //     useEffect(() => {
// //         PhotosFromDb.forEach(photo => {
// //             console.log("Photo from Db", photo);
// //             dispatch(AddPhotoToRedux(photo));
// //         })
// //     }, [PhotosFromDb])


// //     const photos = useSelector((state) => state.photo.Photos);
// //     const dispatch = useDispatch();

// //     const deletePhoto = (id) => {
// //         console.log("Photo to delete", id);
// //         //To Delete from Live Photo
// //         dispatch(DeletePhotoFromRedux(id));
// //         //To Delete all those events from Calendar
// //         let payload = {
// //             TodoIdToDeleteAllSuchEventsFromCalendar: id
// //         }
// //         dispatch(deleteEventFromRedux(payload))

// //     };

// //     const LivePhotos = useSelector((state) => { return state.photo.Photos })
// //     const SavePhoto = async () => {
// //         console.log("Save Photo Clicked");
// //         const res2 = await fetch("http://localhost:3000/apiPhotos/SaveLivePhotos", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ LivePhotos: LivePhotos }),
// //         })

// //     }
// //     const addPhoto = () => {
// //         const uniqueId = uuidv4(); // Generate a unique ID
// //         const newPhoto = { id: uniqueId, photoName: "Photo Name", PhotoUrl: "" }; // You can replace "Photo Name" with dynamic data if needed
// //         dispatch(AddPhotoToRedux(newPhoto));
// //     };

// //     const handleChange = (id, value) => {
// //         dispatch(UpdatePhotoFromRedux({ id, newName: value }));
// //     };

// //     return (
// //         <>
// //             <Challenge />
// //             <div className='px-10 borde borde'>
// //                 <HeaderSection onAddPhoto={addPhoto} onSavePhoto={SavePhoto} />
// //                 <div className='Photo-Card-Holder flex-col borde overflow-y-scroll  border p-15 '>
// //                     {photos.map((photo) => (
// //                         <div key={photo.id} className='flex border  border-blue-600 flex-col justify-between items-center  px-7'>
// //                             <div className='w-[90%]'>
// //                                 <input
// //                                     placeholder='Enter Photo Name'
// //                                     type="text"

// //                                     value={photo.photoName}
// //                                     onChange={(event) => handleChange(photo.id, event.target.value)}
// //                                 />
// //                                 <button type='button' className='borde py-4 px-10 rounded-[20px] ' onClick={() => deletePhoto(photo.id)}>Delete</button>
// //                                 <PhotoCard photo={photo.id} />
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Photo;

import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCards';
import Challenge from './PhotoCardComponenents/Challenge.jsx';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddPhotoToRedux,
    DeletePhotoFromRedux,
    UpdatePhotoFromRedux,
    ClearPhotoDeltas,
    RebuildAddedFromPhotos
} from '../../../ReduxToolkit/Slices/PhotoSlice';

import { deleteEventFromRedux } from '../../../ReduxToolkit/Slices/CalendarSlice';
import HeaderSection from './PhotoCardComponenents/HelperFunctions/HeaderSection.jsx';

const Photo = () => {
    const dispatch = useDispatch();
    const [PhotosFromDb, setPhotosFromDb] = useState([]);

    useEffect(() => {
        const fetchPhotosFromDb = async () => {
            try {
                const res = await fetch("http://localhost:3000/apiPhotos/GetLivePhotos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const DbPhotos = await res.json();
                console.log("📸 Db Photos:", DbPhotos);
                setPhotosFromDb(DbPhotos.Photos);
            } catch (error) {
                console.error("❌ Error fetching photos:", error);
            }
        };
        fetchPhotosFromDb();
    }, []);

    useEffect(() => {
        if (PhotosFromDb.length > 0) {
            dispatch(ClearPhotoDeltas());
            PhotosFromDb.forEach(photo => {
                dispatch(AddPhotoToRedux({ ...photo, fromDb: true }));
            });
        }

        // ✅ REBUILD `added[]` for unsaved ones that were missed
        dispatch(RebuildAddedFromPhotos());
    }, [PhotosFromDb]);

    const photos = useSelector((state) => state.photo.Photos);
    const { added, updated, deleted } = useSelector((state) => state.photo);

    const addPhoto = () => {
        const uniqueId = uuidv4();
        const newPhoto = { id: uniqueId, photoName: "Photo Name", PhotoUrl: "", CollectionType: "LivePhotos" };
        dispatch(AddPhotoToRedux(newPhoto));
    };

    const deletePhoto = (id) => {
        dispatch(DeletePhotoFromRedux(id));
        dispatch(deleteEventFromRedux({ TodoIdToDeleteAllSuchEventsFromCalendar: id }));
    };

    const handleChange = (id, value) => {
        dispatch(UpdatePhotoFromRedux({ id, newName: value }));
    };

    const SavePhoto = async () => {
        console.log("📝 Saving delta...");
        const payload = { added, updated, deleted };

        try {
            const res = await fetch("http://localhost:3000/apiPhotos/SaveLivePhotos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                console.log("✅ Delta save successful");
                dispatch(ClearPhotoDeltas());
            } else {
                const errorData = await res.json();
                console.error("❌ Server error saving photos:", errorData);
            }
        } catch (err) {
            console.error("❌ Save request failed:", err);
        }
    };

    return (
        <>
            <Challenge />
            <div className='min-h-screen bg-gray-50 px-6 py-8'>
                <HeaderSection onAddPhoto={addPhoto} onSavePhoto={SavePhoto} />
                <div className='max-w-4xl mx-auto mt-8'>
                    <div className='space-y-6'>
                        {photos.map((photo) => (
                            <div key={photo.id} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                                <div className='p-6'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <input
                                            placeholder='Enter Photo Name'
                                            type="text"
                                            value={photo.photoName}
                                            onChange={(event) => handleChange(photo.id, event.target.value)}
                                            className='text-lg font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 focus:px-2 focus:py-1 focus:rounded-md transition-all duration-200 flex-1'
                                        />
                                        <button
                                            type='button'
                                            className='text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-all duration-200 text-sm font-medium'
                                            onClick={() => deletePhoto(photo.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <PhotoCard photo={photo.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Photo;
