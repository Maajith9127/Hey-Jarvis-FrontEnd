import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  CalendarEvents: [], // Holds all calendar event objects
};

const CalendarSlice = createSlice({
  name: 'CalendarSlice',
  initialState,
  reducers: {
    // Add a new event (on drop)
    addEventsToRedux: (state, action) => {
      const newEvent = action.payload;
    //  console.log("Hi here we are in the addReducer the payload is",action.payload)
      // 🔍 Check if event with same SpecificEventId already exists
      const alreadyExists = state.CalendarEvents.some(
        (event) => event.SpecificEventId === newEvent.SpecificEventId
      );

      if (alreadyExists) {
        // console.warn("⚠️ Event already exists with SpecificEventId:", newEvent.SpecificEventId);
        return; // ❌ Exit early to prevent duplicate
      }
      else{
        state.CalendarEvents.push(newEvent)
      }
    }
    ,
    // Update event on drag/move/resize
    updateEventInRedux: (state, action) => {
      const updatedEvent = action.payload;

      // console.log("Inside Reducer Updated Events start time:", updatedEvent.start);
      // console.log("Inside Reducer Updated Events end time:", updatedEvent.end);
      // console.log("Inside Reducer Updated Events Time Slot:", updatedEvent.timeSlot);
      // The Code Below means that
      state.CalendarEvents = state.CalendarEvents.map(event =>
        event.SpecificEventId === updatedEvent.SpecificEventId
          ? { ...event, ...updatedEvent }
          : event
      );
    },
    // Delete event from calendar
    deleteEventFromRedux: (state, action) => {
      console.log("Inside deleteEventFromRedux Reducer",action.payload);
      if (action.payload.TodoIdToDeleteAllSuchEventsFromCalendar) {
        // console.log("This delete was clicked from Photo Live")
        const idToDelete = action.payload.TodoIdToDeleteAllSuchEventsFromCalendar;
        state.CalendarEvents = state.CalendarEvents.filter(
          event => event.TodoId !== idToDelete
        );
      }
      else {
        // console.log('This delete was clicked from Calendar delete')
        const idToDelete = action.payload.SpecificEventId;
        // console.log("Del")
        state.CalendarEvents = state.CalendarEvents.filter(
          event => event.SpecificEventId !== idToDelete
        );
      }
    }
  }
});

export const {
  addEventsToRedux,
  updateEventInRedux,
  deleteEventFromRedux
} = CalendarSlice.actions;

export default CalendarSlice.reducer;
