import { createReducer } from '@reduxjs/toolkit';
import {
    changeCompletedOrderArray,
    deleteCartarray,
    deleteCompletedOrderArray,
    setCartArray, setCartBubble, setCategories, setCloseModal, setCompletedOrderArray, setCountries,
    setFavoriteList, setGlobalErrorMessage, setIsGuestPopUp, setIsLoader, setIsLoginFormOpen,
    setIsNotificationPopUp,
    setIsRegFormOpen, setLogout, setNotFound, setNotFoundCategory,
    setNotificationBoldMessage,
    setNotificationMessage,
    setOffset,
    setOrderHistory,
    setOrderList, setProductList, setUser
} from './action';
import { initialState } from './initialState';

export const shopReducer = createReducer(initialState, {
    [setProductList]: (state, action) => {
        state.productList = action.payload;
    },
    [setIsLoader]: (state, action) => {
        state.isLoader = action.payload;
    },
    [setIsRegFormOpen]: (state, action) => {
        state.isRegFormOpen = action.payload;
    },
    [setIsLoginFormOpen]: (state, action) => {
        state.isLoginFormOpen = action.payload;
    },
    [setUser]: (state, action) => {
        state.user = action.payload;
    },
    [setLogout]: (state) => {
        state.user = null;
    },
    [setCloseModal]: (state, action) => {
        state.closeModal = action.payload;
    },
    [setCategories]: (state, action) => {
        state.categories = action.payload;
    },
    [setGlobalErrorMessage]: (state, action) => {
        state.globalError = action.payload;
    },
    [setNotFound]: (state, action) => {
        state.notFound = action.payload;
    },
    [setNotFoundCategory]: (state, action) => {
        state.notFoundCategory = action.payload;
    },
    [setIsGuestPopUp]: (state, action) => {
        state.isGuestPopUp = action.payload;
    },
    [setFavoriteList]: (state, action) => {
        state.favoriteList = action.payload;
    },
    [setIsNotificationPopUp]: (state, action) => {
        state.isNotificationPopUp = action.payload;
    },
    [setNotificationBoldMessage]: (state, action) => {
        state.notificationBoldMessage = action.payload;
    },
    [setNotificationMessage]: (state, action) => {
        state.notificationMessage = action.payload;
    },
    [setCartArray]: (state, action) => {
        state.cartArray.push(action.payload);
    },
    [deleteCartarray]:(state,action) =>{
        const filtered = state.cartArray.filter(el=>el.id!==action.payload);
        state.cartArray=filtered;
    },
    [setCountries]: (state, action) => {
        state.countries = action.payload;
    },
    [setCartBubble]: (state, action) => {
        state.cartBubble = action.payload;
    },
    [setOrderList]: (state, action) => {
        state.orderList = action.payload;
    },
    [setCompletedOrderArray]: (state, action) => {
        state.completedOrderArray.push(action.payload);
    },
    [deleteCompletedOrderArray]: (state, action) => {
        const filtered = state.completedOrderArray.filter(el => el.product.id !== action.payload);
        state.completedOrderArray = filtered;
    },
    [changeCompletedOrderArray]: (state, action) => {
        state.completedOrderArray.forEach(el => {
            if (el.product.id = action.payload.id) {
                el.quantity = action.payload.quantity;
                el.orderedPrice = action.payload.orderedPrice;
            }
        })
    },
    [setOffset] : (state, action) =>{
            state.offset=action.payload;
    },
    [setOrderHistory]:(state,action)=>{
        state.orderHistory=action.payload;
    }

})
