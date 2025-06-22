// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   messages: [],
// };

// const MessageSlice = createSlice({

//   name: 'messageSlice',
//   initialState,
//   reducers: {
//     addMessageToRedux: (state, action) => {
//       // console.log(action.payload)

//       //Here we need to check if the elemenet already exits or not before adding it to the redux states
//       const existingMessage= state.messages.find(
//         (message) => message.AccountabilityId === action.payload.AccountabilityId   
//       );
//       if (existingMessage) {
//         // console.warn("⚠️ Message already exists with AccountabilityId:", action.payload.AccountabilityId);
//         return; // ❌ Exit early to prevent duplicate
//       } else {
//         state.messages.push(action.payload);
//       }
//     },

//     deleteMessageFromRedux: (state, action) => {
//       // console.log("deleted")
//       // console.log(action.payload)
//       let UpdatedMessageList = state.messages.filter((message) => message.AccountabilityId !== action.payload.AccountabilityIdToDelete)
//       state.messages = UpdatedMessageList;
//     },

//     updateMessageFromRedux: (state, action) => {
//       const { AccountabilityIdToUpdate, newValue } = action.payload;
//       const messageIndex = state.messages.findIndex(
//         (msg) => msg.AccountabilityId === AccountabilityIdToUpdate
//       );
//       if (messageIndex !== -1) {
//         state.messages[messageIndex].message = newValue;
//       }
//     },

//     updateToAddressFromRedux: (state, action) => {
//       const { AccountabilityIdToUpdate, newValue } = action.payload;
//       const messageIndex = state.messages.findIndex(
//         (msg) => msg.AccountabilityId === AccountabilityIdToUpdate
//       );
//       if (messageIndex !== -1) {
//         state.messages[messageIndex].ToAddress = newValue;
//       }
//     },
//   },
// })

// export const { addMessageToRedux, deleteMessageFromRedux, updateMessageFromRedux, updateToAddressFromRedux } = MessageSlice.actions;
// export default MessageSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  added: [],
  updated: [],
  deleted: []
};

const MessageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    addMessageToRedux: (state, action) => {
      const exists = state.messages.find(msg => msg.AccountabilityId === action.payload.AccountabilityId);
      if (exists) return;

      state.messages.push(action.payload);

      if (!action.payload.fromDb) {
        state.added.push(action.payload);
      }
    },

    deleteMessageFromRedux: (state, action) => {
      const id = action.payload.AccountabilityIdToDelete;
      state.messages = state.messages.filter(msg => msg.AccountabilityId !== id);

      const wasInAdded = state.added.find(msg => msg.AccountabilityId === id);
      if (wasInAdded) {
        state.added = state.added.filter(msg => msg.AccountabilityId !== id);
        return;
      }

      state.updated = state.updated.filter(msg => msg.AccountabilityId !== id);
      state.deleted.push(id);
    },

    updateMessageFromRedux: (state, action) => {
      const { AccountabilityIdToUpdate, newValue } = action.payload;

      const msg = state.messages.find(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
      if (msg) {
        msg.message = newValue;

        const inAdded = state.added.find(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
        if (inAdded) {
          inAdded.message = newValue; // ✅ Update inside added[]
        } else {
          const index = state.updated.findIndex(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
          if (index === -1) {
            state.updated.push({ ...msg });
          } else {
            state.updated[index].message = newValue;
          }
        }
      }
    },

    updateToAddressFromRedux: (state, action) => {
      const { AccountabilityIdToUpdate, newValue } = action.payload;

      const msg = state.messages.find(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
      if (msg) {
        msg.ToAddress = newValue;

        const inAdded = state.added.find(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
        if (inAdded) {
          inAdded.ToAddress = newValue; // ✅ Update inside added[]
        } else {
          const index = state.updated.findIndex(msg => msg.AccountabilityId === AccountabilityIdToUpdate);
          if (index === -1) {
            state.updated.push({ ...msg });
          } else {
            state.updated[index].ToAddress = newValue;
          }
        }
      }
    },

    clearMessageDeltas: (state) => {
      state.added = [];
      state.updated = [];
      state.deleted = [];
    },

    RebuildAddedFromMessages: (state) => {
      const addedMap = new Map(state.added.map(m => [m.AccountabilityId, true]));
      const missing = state.messages.filter(m => !m.fromDb && !addedMap.has(m.AccountabilityId));
      state.added.push(...missing);
    }
  }
});

export const {
  addMessageToRedux,
  deleteMessageFromRedux,
  updateMessageFromRedux,
  updateToAddressFromRedux,
  clearMessageDeltas,
  RebuildAddedFromMessages
} = MessageSlice.actions;

export default MessageSlice.reducer;
