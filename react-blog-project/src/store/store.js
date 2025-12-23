import { configureStore } from "@reduxjs/toolkit"
import authSlice from '../store/features/authSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
    }
});

export default store;