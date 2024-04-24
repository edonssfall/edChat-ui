import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal.slice.ts";
import authSlice from "./slices/auth.slice.ts";
import userSlice from "./slices/user.slice.ts";

const store = configureStore({
    reducer: {
        modal: modalSlice,
        user: userSlice,
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
