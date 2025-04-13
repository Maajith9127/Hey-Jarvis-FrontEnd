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
      state.CalendarEvents.push(action.payload);
    },

    // Update event on drag/move/resize
    updateEventInRedux: (state, action) => {
      const updatedEvent = action.payload;
      state.CalendarEvents = state.CalendarEvents.map(event =>
        event.SpecificEventId === updatedEvent.SpecificEventId
          ? { ...event, ...updatedEvent }
          : event
      );
    },

    // Delete event from calendar
    deleteEventFromRedux: (state, action) => {
      const idToDelete = action.payload;
      state.CalendarEvents = state.CalendarEvents.filter(
        event => event.SpecificEventId !== idToDelete
      );
    }
  }
});

export const {
  addEventsToRedux,
  updateEventInRedux,
  deleteEventFromRedux
} = CalendarSlice.actions;

export default CalendarSlice.reducer;
