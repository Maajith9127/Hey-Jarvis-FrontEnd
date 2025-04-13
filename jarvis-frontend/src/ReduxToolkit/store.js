import { configureStore } from '@reduxjs/toolkit';
import  PhotoReducer  from './Slices/PhotoSlice.jsx';
import calendarReducer from './Slices/CalendarSlice';

export const store = configureStore({
    reducer:{
        photo:PhotoReducer,
        calendar:calendarReducer,
    }
})


// It’s the global Redux state tree, structured like this:
// const state = {
//   photo: {
//     Photos: [/* your photo array */]
//   }
// }