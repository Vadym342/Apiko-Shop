
import { createReducer } from "@reduxjs/toolkit";
import { setIsNotificationPopUp, setNotificationBoldMessage, setNotificationMessage } from "../actions/notification-action";


const initialState ={
    isNotificationPopUp:false,
    notificationBoldMessage:'',
    notificationMessage:'',
}

export const notificationReducer = createReducer(initialState, {
[setIsNotificationPopUp]: (state, action) => {
    state.isNotificationPopUp = action.payload;
},
[setNotificationBoldMessage]: (state, action) => {
    state.notificationBoldMessage = action.payload;
},
[setNotificationMessage]: (state, action) => {
    state.notificationMessage = action.payload;
},
})