// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   CalendarEvents: [], // Holds all calendar event objects
// };

// const CalendarSlice = createSlice({
//   name: 'CalendarSlice',
//   initialState,
//   reducers: {
//     // Add a new event (on drop)
//     addEventsToRedux: (state, action) => {
//       const newEvent = action.payload;
//     //  console.log("Hi here we are in the addReducer the payload is",action.payload)
//       // 🔍 Check if event with same SpecificEventId already exists
//       const alreadyExists = state.CalendarEvents.some(
//         (event) => event.SpecificEventId === newEvent.SpecificEventId
//       );

//       if (alreadyExists) {
//         // console.warn("⚠️ Event already exists with SpecificEventId:", newEvent.SpecificEventId);
//         return; // ❌ Exit early to prevent duplicate
//       }
//       else{
//         state.CalendarEvents.push(newEvent)
//       }
//     }
//     ,
//     // Update event on drag/move/resize
//     updateEventInRedux: (state, action) => {
//       const updatedEvent = action.payload;

//       // console.log("Inside Reducer Updated Events start time:", updatedEvent.start);
//       // console.log("Inside Reducer Updated Events end time:", updatedEvent.end);
//       // console.log("Inside Reducer Updated Events Time Slot:", updatedEvent.timeSlot);
//       // The Code Below means that
//       state.CalendarEvents = state.CalendarEvents.map(event =>
//         event.SpecificEventId === updatedEvent.SpecificEventId
//           ? { ...event, ...updatedEvent }
//           : event
//       );
//     },
//     // Delete event from calendar
//     deleteEventFromRedux: (state, action) => {
//       console.log("Inside deleteEventFromRedux Reducer",action.payload);
//       if (action.payload.TodoIdToDeleteAllSuchEventsFromCalendar) {
//         // console.log("This delete was clicked from Photo Live")
//         const idToDelete = action.payload.TodoIdToDeleteAllSuchEventsFromCalendar;
//         state.CalendarEvents = state.CalendarEvents.filter(
//           event => event.TodoId !== idToDelete
//         );
//       }
//       else {
//         // console.log('This delete was clicked from Calendar delete')
//         const idToDelete = action.payload.SpecificEventId;
//         // console.log("Del")
//         state.CalendarEvents = state.CalendarEvents.filter(
//           event => event.SpecificEventId !== idToDelete
//         );
//       }
//     }
//   }
// });

// export const {
//   addEventsToRedux,
//   updateEventInRedux,
//   deleteEventFromRedux
// } = CalendarSlice.actions;

// export default CalendarSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  CalendarEvents: [],
  added: [],
  updated: [],
  deleted: []
};

const CalendarSlice = createSlice({
  name: 'CalendarSlice',
  initialState,
  reducers: {
    addEventsToRedux: (state, action) => {
      const newEvent = {
        ...action.payload,
        fromDb: action.payload.fromDb ?? false
      };

      const alreadyExists = state.CalendarEvents.some(
        (event) => event.SpecificEventId === newEvent.SpecificEventId
      );

      if (!alreadyExists) {
        state.CalendarEvents.push(newEvent);
        if (!newEvent.fromDb) {
          state.added.push(newEvent);
        }
      }
    },

    updateEventInRedux: (state, action) => {
      const updatedEvent = action.payload;

      state.CalendarEvents = state.CalendarEvents.map(event =>
        event.SpecificEventId === updatedEvent.SpecificEventId
          ? { ...event, ...updatedEvent }
          : event
      );

      const inAdded = state.added.find(event => event.SpecificEventId === updatedEvent.SpecificEventId);
      if (inAdded) {
        Object.assign(inAdded, updatedEvent); // ✅ Reflect update inside added[]
      } else {
        const index = state.updated.findIndex(event => event.SpecificEventId === updatedEvent.SpecificEventId);
        if (index === -1) {
          state.updated.push(updatedEvent);
        } else {
          state.updated[index] = { ...state.updated[index], ...updatedEvent };
        }
      }
    },

    deleteEventFromRedux: (state, action) => {
      if (action.payload.TodoIdToDeleteAllSuchEventsFromCalendar) {
        const idToDelete = action.payload.TodoIdToDeleteAllSuchEventsFromCalendar;

        const eventsToDelete = state.CalendarEvents.filter(
          event => event.TodoId === idToDelete
        );

        const realDeletes = eventsToDelete.filter(ev => ev.fromDb);
        state.deleted.push(...realDeletes);

        state.CalendarEvents = state.CalendarEvents.filter(
          event => event.TodoId !== idToDelete
        );

        state.added = state.added.filter(event => event.TodoId !== idToDelete);
        state.updated = state.updated.filter(event => event.TodoId !== idToDelete);

      } else {
        const idToDelete = action.payload.SpecificEventId;

        const eventToDelete = state.CalendarEvents.find(
          event => event.SpecificEventId === idToDelete
        );

        if (eventToDelete && eventToDelete.fromDb) {
          state.deleted.push(eventToDelete);
        }

        state.CalendarEvents = state.CalendarEvents.filter(
          event => event.SpecificEventId !== idToDelete
        );

        state.added = state.added.filter(event => event.SpecificEventId !== idToDelete);
        state.updated = state.updated.filter(event => event.SpecificEventId !== idToDelete);
      }
    },

    clearDeltaEvents: (state) => {
      state.added = [];
      state.updated = [];
      state.deleted = [];
    }
  }
});

export const {
  addEventsToRedux,
  updateEventInRedux,
  deleteEventFromRedux,
  clearDeltaEvents
} = CalendarSlice.actions;

export default CalendarSlice.reducer;
