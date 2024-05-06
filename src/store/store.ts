import tokenSlice from './slices/token.slice.ts';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/user.slice.ts';

const store = configureStore({
    reducer: {
        token: tokenSlice,
        user: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
