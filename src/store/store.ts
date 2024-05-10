import tokenSlice from './slices/token.slice.ts';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/user.slice.ts';
import chatSlice from "./slices/chat.slice.ts";

/**
 * @name store
 * @description Store for the application
 */
const store = configureStore({
    reducer: {
        token: tokenSlice,
        user: userSlice,
        chat: chatSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
