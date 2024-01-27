import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("payload",action.payload)
      const newUser = {
        ...action.payload,
        userId: nanoid(), // Generate a unique id using nanoid
      };
      state.users.push(newUser);
    },
    // Add other user-related actions as needed
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;