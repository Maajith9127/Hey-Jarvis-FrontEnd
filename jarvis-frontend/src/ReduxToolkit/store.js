import { configureStore } from '@reduxjs/toolkit';
import  PhotoReducer  from './Slices/PhotoSlice.jsx';
import calendarReducer from './Slices/CalendarSlice';
import MessageReducer from './Slices/MessageSlice.jsx'

export const store = configureStore({
    reducer:{
        photo:PhotoReducer,
        calendar:calendarReducer,
        message:MessageReducer,
    }
})


// It’s the global Redux state tree, structured like this:
// const state = {
//   photo: {
//     Photos: [/* your photo array */]
//   }
// }