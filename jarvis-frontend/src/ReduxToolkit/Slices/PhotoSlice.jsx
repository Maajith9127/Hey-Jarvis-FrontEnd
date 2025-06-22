// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     Photos: [], // example structure
// };

// export const PhotoSlice = createSlice(
//     {
//         name: 'PhotoSlice',
//         initialState,
//         reducers: {
//             AddPhotoToRedux: (state, action) => {
//                 console.log('Dispatched Payload:', action.payload);
//                 console.log('State:', JSON.parse(JSON.stringify(state.Photos)));
//                 // Check if the photo already exists in the state
//                 const alreadyExists = state.Photos.some(photo => photo.id === action.payload.id);
//                 console.log('Already Exists:', alreadyExists);
//                 if (!alreadyExists) {
//                     state.Photos.push(action.payload);
//                     console.log('✅ Photo added');
//                 } else {
//                     console.warn('⚠️ Duplicate photo not added, ID already exists:', action.payload.id);
//                 }
//             },
//             DeletePhotoFromRedux: (state, action) => {
//                 state.Photos = state.Photos.filter(
//                     photo => photo.id !== action.payload
//                 )
//             },
//             UpdatePhotoFromRedux: (state, action) => {
//                 const { id, newName } = action.payload;
//                 const photo = state.Photos.find(photo => photo.id === id);
//                 if (photo) {
//                     photo.photoName = newName;
//                 }
//             },
//             UpdatePhotoUrlFromRedux: (state, action) => {
//                 const photo = state.Photos.find(photo => photo.id === action.payload.PhotoId);
//                 if (photo) {
//                     photo.PhotoUrl = action.payload.PhotoUrl;
//                 }
//             }
//         }
//     }
// )
// export const { AddPhotoToRedux, DeletePhotoFromRedux, UpdatePhotoFromRedux, UpdatePhotoUrlFromRedux } = PhotoSlice.actions;
// export default PhotoSlice.reducer;


// In .../ReduxToolkit/Slices/PhotoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Photos: [],
    added: [],
    updated: [],
    deleted: []
};

export const PhotoSlice = createSlice({
    name: 'PhotoSlice',
    initialState,
    reducers: {
        AddPhotoToRedux: (state, action) => {
            const { fromDb, ...photo } = action.payload;
            const alreadyExists = state.Photos.some(p => p.id === photo.id);

            if (!alreadyExists) {
                // Add with fromDb flag inside
                state.Photos.push({ ...photo, fromDb: !!fromDb });

                // Only track in added[] if not from DB
                if (!fromDb) {
                    state.added.push(photo);
                }
            }
        },

        DeletePhotoFromRedux: (state, action) => {
            const id = action.payload;

            state.Photos = state.Photos.filter(photo => photo.id !== id);

            const wasAdded = state.added.find(photo => photo.id === id);
            if (wasAdded) {
                state.added = state.added.filter(photo => photo.id !== id);
            } else {
                state.updated = state.updated.filter(photo => photo.id !== id);
                state.deleted.push(id);
            }
        },

        UpdatePhotoFromRedux: (state, action) => {
            const { id, newName } = action.payload;
            const photo = state.Photos.find(p => p.id === id);
            if (photo) {
                photo.photoName = newName;

                const addedPhoto = state.added.find(p => p.id === id);
                if (addedPhoto) {
                    addedPhoto.photoName = newName;
                } else {
                    const existingUpdate = state.updated.find(p => p.id === id);
                    if (existingUpdate) {
                        existingUpdate.photoName = newName;
                    } else {
                        state.updated.push({ id, photoName: newName });
                    }
                }
            }
        },

        UpdatePhotoUrlFromRedux: (state, action) => {
            const { PhotoId, PhotoUrl } = action.payload;
            const photo = state.Photos.find(p => p.id === PhotoId);
            if (photo) {
                photo.PhotoUrl = PhotoUrl;

                const addedPhoto = state.added.find(p => p.id === PhotoId);
                if (addedPhoto) {
                    addedPhoto.PhotoUrl = PhotoUrl;
                } else {
                    const existingUpdate = state.updated.find(p => p.id === PhotoId);
                    if (existingUpdate) {
                        existingUpdate.PhotoUrl = PhotoUrl;
                    } else {
                        state.updated.push({ id: PhotoId, PhotoUrl });
                    }
                }
            }
        },

        ClearPhotoDeltas: (state) => {
            state.added = [];
            state.updated = [];
            state.deleted = [];
        },

        RebuildAddedFromPhotos: (state) => {
            const addedMap = new Map(state.added.map(p => [p.id, true]));

            const missing = state.Photos.filter(p => !p.fromDb && !addedMap.has(p.id));

            state.added.push(...missing);
        }
    }
});

export const {
    AddPhotoToRedux,
    DeletePhotoFromRedux,
    UpdatePhotoFromRedux,
    UpdatePhotoUrlFromRedux,
    ClearPhotoDeltas,
    RebuildAddedFromPhotos
} = PhotoSlice.actions;

export default PhotoSlice.reducer;
