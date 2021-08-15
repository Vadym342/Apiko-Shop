import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import  {shopReducer} from "./reducer";
import { reducer as formReducer } from 'redux-form';
import { notificationReducer } from "./reducers/notification-reducer";

// const reducers = combineReducers({
//     shopReducer: shopReducer,
//     notificationReducer : notificationReducer,
// })


export const store = configureStore({
    reducer: shopReducer, 
    preloadedState: initialState
})
