export const initialState = {
    productList :[],  
    isLoader: false,
    isRegFormOpen: false,
    isLoginFormOpen: false,
    user: null,
    closeModal:false,
    globalError:'',
    categories:[],
    countries:[],
    notFound:false,
    notFoundCategory:false,
    isGuestPopUp:false,
    favoriteList:[],
    cartArray:[{
        id:0,
        count:0,
        totalPrice:0
    }],
    isNotificationPopUp:false,
    notificationBoldMessage:'',
    notificationMessage:'',
    cartBubble:0,
    orderList:[],
    completedOrderArray:[]
}