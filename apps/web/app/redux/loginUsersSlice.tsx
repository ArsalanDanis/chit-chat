import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  logedInUsers: [],
};

export const logedInSlice = createSlice({
  name: "logedInUsers",
  initialState,
  reducers: {
    addlogedInUser: (state, action) => {
      console.log("payload",action.payload)
      const newUser = {
        ...action.payload,
        userId: nanoid(), // Generate a unique id using nanoid
      };
      state.logedInUsers.push(newUser);
    },
    // Add other user-related actions as needed
  },
});

export const { addlogedInUser } = logedInSlice.actions;
export default logedInSlice.reducer;