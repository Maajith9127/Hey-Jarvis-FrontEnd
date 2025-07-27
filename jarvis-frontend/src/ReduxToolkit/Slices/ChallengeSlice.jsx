// ReduxToolkit/Slices/ChallengeSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  open: false,
  accountability: null,
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    setChallengeData: (state, action) => {
      console.log("Inside Challenge Reducer", action.payload);
      state.data = action.payload;
      if (state.open === false) {
        state.open = true;
      } else {
        state.open = false;
      }
    },
    setSelectedAccountability: (state, action) => {
      state.accountability = action.payload;
    },


  },
});

export const { setChallengeData,setSelectedAccountability } = challengeSlice.actions;
export default challengeSlice.reducer;
