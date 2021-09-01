import {configureStore} from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import  {shopReducer} from "./reducer";

export const store = configureStore({
    reducer: shopReducer, 
    preloadedState: initialState
})
