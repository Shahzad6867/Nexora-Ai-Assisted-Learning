import { combineReducers, configureStore, type UnknownAction } from "@reduxjs/toolkit";
import authSliceReducer from "../features/authSlice";
import adminSliceReducer from "../features/adminSlice";
import institutionSliceReducer from "../features/institutionSlice";
import requestSliceReducer from "../features/requestSlice";
import api from "../api/api";


const appReducer = combineReducers({
    auth: authSliceReducer,
    admin: adminSliceReducer,
    institution: institutionSliceReducer,
    request: requestSliceReducer
});


const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
    if (action.type === 'auth/logout') {
        state = undefined; 
    }
    return appReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
