// ReduxToolkit/Slices/ChallengeSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  open: false,
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

  },
});

export const { setChallengeData } = challengeSlice.actions;
export default challengeSlice.reducer;
