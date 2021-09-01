import { createAction } from "@reduxjs/toolkit";

export const setProductList = createAction('shoesList/set');
export const setIsLoader = createAction('isloader/set');
export const setIsRegFormOpen = createAction('isRegFormOpen/set');
export const setIsLoginFormOpen = createAction('isLoginFormOpen/set');
export const setUser = createAction('user/set');
export const setLogout = createAction('logout/set');
export const setCloseModal = createAction('closeModal/set');
export const setGlobalErrorMessage = createAction('globalError/set');
export const setCategories = createAction('categoris/set');
export const setCountries = createAction('countries/set');
export const setNotFound = createAction('notFound/set');
export const setNotFoundCategory = createAction('notFoundCategoty/set');
export const setIsGuestPopUp = createAction('IsguestPopUp/set');
export const setFavoriteList = createAction('favoriteList/set');
export const setIsNotificationPopUp = createAction('IsNotificationPopUp/set');
export const setNotificationBoldMessage = createAction('notificationBoldMes/set');
export const setNotificationMessage = createAction('notificationMes/set');
export const setCartArray = createAction('cartArray/set');
export const deleteCartarray = createAction('deleteCartArray/delete');
export const setCartBubble = createAction('cartBubble/set');
export const setOrderList = createAction('orderList/set');
export const setCompletedOrderArray = createAction('completedOrderArray/set');
export const deleteCompletedOrderArray = createAction('completedOrderArray/delete');
export const changeCompletedOrderArray = createAction('changeCompletedOrderArray/set');
export const setOffset = createAction('offset/set');
export const setOrderHistory = createAction('orderHistory/set');

export const fetchProductList = (payload) => (dispatch, getState) => {
    dispatch(setIsLoader(true));
    let headers;
    if (getState().user === null) {
        headers = {
            'accept': 'application/json',
        }
    } else {
        headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${getState().user.token}`,
        }
    }
    const fetchData = async () => {
        try {
            if (payload.category <= 0) {
                const res = await fetch(`/api/products?offset=${getState().offset}&limit=12&sortBy=${payload.sortBy}`,
                    {
                        method: 'GET',
                        headers
                    }
                );
                const data = await res.json();
                if (data !== null) {
                    dispatch(setIsLoader(false));
                    const prewProductList = getState().productList;
                    const newProductList = [...prewProductList, ...data];
                    dispatch(setProductList(newProductList));
                }
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const registrationUser = (payload) => (dispatch) => {
    dispatch(setIsLoader(true));
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)

                });
            if (res.status === 200) {
                dispatch(setCloseModal(false))
            }
            if (res.status === 409) {
                dispatch(setGlobalErrorMessage('Such email is already used'));
            }
            dispatch(setIsLoader(false));
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const loginUser = (payload) => (dispatch, getState) => {
    dispatch(setIsLoader(true));
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            const data = await res.json();
            if (res.status === 200) {
                dispatch(setCloseModal(false))
                dispatch(setUser(data));
                localStorage.setItem("AuthToken", getState().user.token);
                console.log(getState().user.token);
            }
            dispatch(setIsLoader(false));
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const getUser = (payload) => (dispatch) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/account`,
                {
                    method: 'GET',
                    headers: payload
                });
            const data = await res.json();
            if (res.status === 200) {
                dispatch(setUser({
                    token: localStorage.getItem("AuthToken"),
                    account: data
                }));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const putUser = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/account`,
                {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${getState().user.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            if (res.status === 500) {
                dispatch(setGlobalErrorMessage('Such email is already used'));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}
export const putUserPassword = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/account/password`,
                {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${getState().user.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
        } catch (err) {
        }
    }
    fetchData();
}
export const fetchCategories = (payload) => (dispatch) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/categories`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });
            const data = await res.json();
            if (res.status === 200) {
                dispatch(setCategories(data));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const fetchCountries = (payload) => (dispatch) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/locations/countries`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });
            const data = await res.json();
            if (res.status === 200) {
                dispatch(setCountries(data));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}
export const searchItem = (payload) => (dispatch, getState) => {
    let headers;
    if (getState().user === null) {
        headers = {
            'accept': 'application/json',
        }
    } else {
        headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${getState().user.token}`,
        }
    }
    const fetchData = async () => {
        try {
            if (payload.length >= 3) {
                dispatch(setIsLoader(true));
                const res = await fetch(`/api/products/search?keywords=${payload}&offset=0&limit=12`,
                    {
                        method: 'GET',
                        headers
                    });
                const data = await res.json();
                if (res.status === 200) {
                    if (data.length === 0) {
                        dispatch(setNotFound(true));
                    } else {
                        dispatch(setNotFound(false));
                        dispatch(setProductList(data));
                    }
                }
                dispatch(setIsLoader(false));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const getProductsByCategoryId = (payload) => (dispatch, getState) => {
    dispatch(setIsLoader(true));
    let headers;
    if (getState().user === null) {
        headers = {
            'accept': 'application/json',
        }
    } else {
        headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${getState().user.token}`,
        }
    }
    const fetchData = async () => {
        if (payload.category >= 1) {
            try {
                const res = await fetch(`/api/categories/${payload.category}/products?offset=${getState().offset}&limit=12&sortBy=${payload.sortBy}`,
                    {
                        method: 'GET',
                        headers
                    });

                const data = await res.json();
                if (res.status === 400) {
                    dispatch(setNotFoundCategory(true));
                }
                if (res.status === 200) {
                    dispatch(setNotFoundCategory(false));
                    const prewProductList = getState().productList;
                    const newProductList = [...prewProductList, ...data];
                    dispatch(setProductList(newProductList));
                }
                dispatch(setIsLoader(false));
            } catch (err) {
                console.log("Error", err);
            }
        }
    }
    fetchData();
}

export const postFavoriteById = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            if (getState().user !== null) {
                const res = await fetch(`/api/products/${payload}/favorite`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${getState().user.token}`,
                        },
                    });
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const deleteFavoriteById = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            if (getState().user !== null) {
                const res = await fetch(`/api/products/${payload}/favorite`,
                    {
                        method: 'DELETE',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${getState().user.token}`,
                        },
                    });
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const getFavoriteList = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        if (getState().user !== null) {
            const res = await fetch(`/api/products/favorites?offset=0&limit=20`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${getState().user.token}`,
                    },
                });
            const data = await res.json();
            if (res.status === 200) {
                dispatch(setFavoriteList(data));
            }
        }
    }
    fetchData();
}

export const postOrder = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            if (getState().user !== null) {
                const res = await fetch(`/api/orders`,
                    {
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${getState().user.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}
export const getProductsByArray = (payload) => (dispatch, getState) => {
    let arrOrder = [];
    let cartArray = getState().cartArray;
    let cartBubble = getState().cartBubble;
    let url = '/api/products/ids?';
    for (let el in cartArray) {
        arrOrder.push(cartArray[el].id);
    }
    for (let i = 0; i < arrOrder.length; i++) {
        url += `id=${arrOrder[i]}&`;
    }

    const fetchData = async () => {
        try {
            if (arrOrder.length > 0) {
                const res = await fetch(url,
                    {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                        },
                    });
                const data = await res.json();
                if (res.status === 200) {
                    sessionStorage.setItem('cartBubble', JSON.stringify(cartBubble));
                    sessionStorage.setItem('cartArray', JSON.stringify(cartArray));
                    sessionStorage.setItem('orderList',JSON.stringify(data));
                    dispatch(setOrderList(data));
                }
            }
            //  else {
            //     dispatch(setOrderList([]));
            // }
        } catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}

export const getOrderHistory = (payload) => (dispatch, getState) => {
    const fetchData = async () => {
        try {
            if (getState().user !== null) {
                const res = await fetch(`/api/orders?offset=0&limit=12`,
                    {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${getState().user.token}`,
                        },
                    });
                const data = await res.json();
                if (res.status === 200) {
                    dispatch(setOrderHistory(data));
                }
            }
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    fetchData();
}