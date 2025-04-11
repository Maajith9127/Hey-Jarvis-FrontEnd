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

                state.Photos.push(action.payload);
            },
            DeletePhotoFromRedux: (state, action) => {
                state.Photos = state.Photos.filter(
                    photo => photo.id !== action.payload
                )},
            UpdatePhotoFromRedux:(state,action) =>{
                const { id, newName } = action.payload;
                const photo = state.Photos.find(photo => photo.id === id);
                if (photo) {
                    photo.photoName = newName;
                }

            },
            }
        }

            


    
)



export const {AddPhotoToRedux,DeletePhotoFromRedux,UpdatePhotoFromRedux}=PhotoSlice.actions;

export default PhotoSlice.reducer;