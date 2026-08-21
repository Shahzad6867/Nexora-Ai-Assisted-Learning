import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";
import adminSliceReducer from "../features/adminSlice";
import institutionSliceReducer from "../features/institutionSlice";
import requestSliceReducer from "../features/requestSlice";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        admin : adminSliceReducer,
        institution : institutionSliceReducer,
        request : requestSliceReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store