import { configureStore } from '@reduxjs/toolkit';
import  PhotoReducer  from './Slices/PhotoSlice.jsx';

export const store = configureStore({
    reducer:{
        photo:PhotoReducer,
    }
})


// It’s the global Redux state tree, structured like this:
// const state = {
//   photo: {
//     Photos: [/* your photo array */]
//   }
// }