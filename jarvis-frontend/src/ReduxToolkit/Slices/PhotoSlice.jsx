import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Photos: [], // example structure
};

export const PhotoSlice = createSlice(
    {
        name: 'PhotoSlice',
        initialState,
        reducers: {
            AddPhotoToRedux: (state, action) => {
                console.log('Dispatched Payload:', action.payload);
                console.log('State:', JSON.parse(JSON.stringify(state.Photos)));
                // Check if the photo already exists in the state
                const alreadyExists = state.Photos.some(photo => photo.id === action.payload.id);
                console.log('Already Exists:', alreadyExists);
                if (!alreadyExists) {
                    state.Photos.push(action.payload);
                    console.log('✅ Photo added');
                } else {
                    console.warn('⚠️ Duplicate photo not added, ID already exists:', action.payload.id);
                }
            },
            DeletePhotoFromRedux: (state, action) => {
                state.Photos = state.Photos.filter(
                    photo => photo.id !== action.payload
                )
            },
            UpdatePhotoFromRedux: (state, action) => {
                const { id, newName } = action.payload;
                const photo = state.Photos.find(photo => photo.id === id);
                if (photo) {
                    photo.photoName = newName;
                }
            },
            UpdatePhotoUrlFromRedux: (state, action) => {
                const photo = state.Photos.find(photo => photo.id === action.payload.PhotoId);
                if (photo) {
                    photo.PhotoUrl = action.payload.PhotoUrl;
                }
            }
        }
    }
)
export const { AddPhotoToRedux, DeletePhotoFromRedux, UpdatePhotoFromRedux, UpdatePhotoUrlFromRedux } = PhotoSlice.actions;
export default PhotoSlice.reducer;