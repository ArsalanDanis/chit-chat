import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './cartSlice'
import messageReducer from './usersDataSlice'
import loginReducer from './loginUsersSlice'
import userReducer from './userSlice'


export const store = configureStore({
    reducer:{
        messagesData : messageReducer,
        usersData : userReducer,
        loginsData : loginReducer,
    },
    
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),

})

