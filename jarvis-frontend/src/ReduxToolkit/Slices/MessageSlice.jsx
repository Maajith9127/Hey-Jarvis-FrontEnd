import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
  };

  const MessageSlice=createSlice({

    name:'messageSlice',
    initialState,
    reducers:{
        addMessageToRedux: (state, action) => {
            console.log(action.payload)
            state.messages.push(action.payload)

           
          },
        
          deleteMessageFromRedux: (state, action) => {
 console.log("deleted")
 console.log(action.payload)
            let UpdatedMessageList=state.messages.filter((message)=>message.AccountabilityId!==action.payload.AccountabilityIdToDelete)
      state.messages=UpdatedMessageList;
          },

          updateMessageFromRedux: (state, action) => {
            const { AccountabilityIdToUpdate, newValue } = action.payload;
            const messageIndex = state.messages.findIndex(
              (msg) => msg.AccountabilityId === AccountabilityIdToUpdate
            );
            if (messageIndex !== -1) {
              state.messages[messageIndex].message = newValue;
            }
            },

          updateToAddressFromRedux:(state,action) =>{
            const { AccountabilityIdToUpdate, newValue } = action.payload;
            const messageIndex = state.messages.findIndex(
                (msg) => msg.AccountabilityId === AccountabilityIdToUpdate
              );
              if (messageIndex !== -1) {
                state.messages[messageIndex].ToAddress = newValue;
              }
          },
        },
  })

  export const { addMessageToRedux, deleteMessageFromRedux, updateMessageFromRedux,updateToAddressFromRedux } = MessageSlice.actions;
  export default MessageSlice.reducer;
