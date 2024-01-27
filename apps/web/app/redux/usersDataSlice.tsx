import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

interface User {
  // Define your user properties here
  Sname: string;
  userId: string;
  Rname: string;
  // Add other properties as needed
}

interface UsersState {
  userData: User[];
}

const initialState: UsersState = {
  userData: [],
};


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser: (state, action: PayloadAction<User>) => {
    //   console.log("payload", action.payload);
    //   const newUser: User = {
    //     ...action.payload,
    //     // userId: nanoid(), // Generate a unique id using nanoid
    //   };
    //   state.users.push(newUser);
    // },
    // Add other user-related actions as needed
    addUsersData: (state, action: PayloadAction<User[]>) => {
        console.log("payload", action.payload);
      const newUsersData = action.payload.map((message) => ({
        userId: nanoid(),
        Sname: message.sender,
        text:message.text,
        timestamp:message.timestamp,
        Rname:message.reciver,


        // Add other properties as needed
      }));

      state.userData.push(...newUsersData);
    },
  },
});

export const { addUsersData } = usersSlice.actions;
export default usersSlice.reducer;
