import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    cartArraySelector, countrySelector, fetchCountries,
    getProductsByArray, orderListSelector, postOrder, setCartArray,
    setCartBubble, setIsNotificationPopUp, setNotificationBoldMessage,
    setNotificationMessage, setOrderList, userSelector
} from '../../store';
import OrderItem from './OrderItem/OrderItem';
import stInp from '../../globalStyle/inputs.module.css';
import buttons from '../../globalStyle/buttons.module.css';
import st from './Order.module.css';
import { useHistory } from 'react-router-dom';


const Order = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(userSelector);
    const countries = useSelector(countrySelector);
    const OrderList = useSelector(orderListSelector);
    const cartArray = useSelector(cartArraySelector);
    const handleFetchOrderProducts = () => {
        dispatch(getProductsByArray());
    }
    const handleCountry = () => {
        dispatch(fetchCountries());
    }
    const userAccount = user.account;
    const [fullName, setFullName] = useState(userAccount.fullName);
    const [country, setCountry] = useState('Afghanistan');
    const [city, setCity] = useState(!userAccount.city ? '' : userAccount.city);
    const [address, setAddress] = useState(!userAccount.address ? '' : userAccount.address);
    const [phone, setPhone] = useState(userAccount.phone);
    const [count, setCount] = useState(cartArray.length);
    let errorsObj = { message: '', fullName: '', phone: '', city: '', address: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [totalPrice, setTotalPrice] = useState(() => {
        let Total = 0;
        for (let item in cartArray) {
            Total += cartArray[item].totalPrice;
        }
        return Total
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const textRegex = new RegExp(/^[a-zA-Z\s]+/);
        const phoneRegex = new RegExp(/^(\+)?([0-9]){10,14}$/);
        const errorObj = { ...errorsObj };
        if (!fullName) {
            errorObj.fullName = 'Required info is missing';
            error = true;
        } else
            if (!textRegex.test(fullName)) {
                errorObj.fullName = 'Incorrect data, correct example: "Vasyan Vasyan"';
                error = true;
            }
        if (!phone) {
            errorObj.phone = 'Required info is missing';
            error = true;
        } else
            if (!phoneRegex.test(phone)) {
                errorObj.phone = 'Incorrect data, correct example: "+1234567890"';
                error = true;
            }
        if (!city) {
            errorObj.city = 'Required info is missing';
            error = true;
        } else
            if (!textRegex.test(city)) {
                errorObj.city = 'Incorrect data, correct example: "Aachen"';
                error = true;
            }
        if (!address) {
            errorObj.address = 'Required info is missing';
            error = true;
        } else
            if (!textRegex.test(address)) {
                errorObj.address = 'Incorrect data, correct example: "Khreshchatyk"';
                error = true;
            }
        setErrors(errorObj);
        const handleConfirmOrder = () => {
            if (OrderList.length > 0) {
                setCount(0);
                setTotalPrice(0);
                dispatch(setCartBubble(0));
                dispatch(setIsNotificationPopUp(true));
                dispatch(setNotificationBoldMessage("order"));
                dispatch(setNotificationMessage("has been successfully processed"));
                OrderList.forEach(el => {
                    for (let item in cartArray) {
                        if (cartArray[item].id === el.id) {
                            dispatch(postOrder({
                                items: [
                                    {
                                        "productId": cartArray[item].id,
                                        "quantity": cartArray[item].count
                                    }
                                ],
                                shipment: {
                                    fullName: fullName,
                                    phone: phone,
                                    country: country,
                                    city: city,
                                    address: address
                                },
                            }));
                        }
                    }
                })
            }
        }
        if (!error) {
            handleConfirmOrder();
        }
    }
    useEffect(() => {
        handleFetchOrderProducts();
        handleCountry();
    }, [cartArray])
    return (
        <div className={st.cartBlock}>
            <div className={st.mainContent}>
                <div className={st.titleBlock}>
                    <p>
                        My cart
                    </p>
                </div>
                <div className={st.flexContainer}>
                    <div className={st.first}>
                        {
                            OrderList.length > 0 ? <div>
                                {
                                    OrderList.map(item => (
                                        <OrderItem
                                            count={count}
                                            setCount={setCount}
                                            totalPrice={totalPrice}
                                            setTotalPrice={setTotalPrice}
                                            key={item.id}
                                            {...item}
                                            item={item}
                                        />
                                    ))
                                }
                            </div>
                                :
                                <div><h3>There are no items in a cart</h3></div>
                        }
                    </div>
                    <div className={st.second}>
                        <div>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className={st.inputBlock}>
                                    <div>
                                        <label className={stInp.input}>
                                            <input value={fullName} onChange={e => setFullName(e.target.value)}
                                                className={errors.fullName ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                            <span className={stInp.input__label}>Full Name</span>
                                        </label>
                                        {errors.fullName && <div className={st.errorMessage}>{errors.fullName}</div>}
                                    </div>
                                    <div className={st.input}>
                                        <label className={stInp.input}>
                                            <input value={phone} onChange={e => setPhone(e.target.value)}
                                                className={errors.phone ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                            <span className={stInp.input__label}>Phone</span>
                                        </label>
                                        {errors.phone && <div className={st.errorMessage}>{errors.phone}</div>}
                                    </div>
                                    <div className={st.input}>
                                        <label className={stInp.input}>
                                            <select className={st.selectCountry, stInp.input__field} defaultValue="Choose Country" onChange={e => setCountry(e.target.value)}>
                                                <option value={country}>{country}</option>
                                                {
                                                    countries.map((country, index) => (
                                                        <option key={country} value={country}>{country}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className={stInp.input__label}>Country</span>
                                        </label>
                                    </div>
                                    <div className={st.input}>
                                        <label className={stInp.input}>
                                            <input value={city} onChange={e => setCity(e.target.value)}
                                                className={errors.city ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                            <span className={stInp.input__label}>{"City"}</span>
                                        </label>
                                        {errors.city && <div className={st.errorMessage}>{errors.city}</div>}
                                    </div>
                                    <div className={st.input}>
                                        <label className={stInp.input}>
                                            <input value={address} onChange={e => setAddress(e.target.value)}
                                                className={errors.address ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                            <span className={stInp.input__label}>{"Address"}</span>
                                        </label>
                                        {errors.address && <div className={st.errorMessage}>{errors.address}</div>}
                                    </div>
                                    <div>
                                        <div className={st.countBlock}>
                                            <div>
                                                <p className={st.text}>Items</p>
                                            </div>
                                            <div>
                                                <span className={st.tabSt}>{count}</span>
                                            </div>
                                        </div>
                                        <div className={st.countBlock}>
                                            <div>
                                                <p className={st.text}>Total</p>
                                            </div>
                                            <div>
                                                <span className={st.tabSt}>${totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={st.buttons}>
                                            <button className={buttons.buttonFill} type="submit" disabled={!user ? true : false}>Confirm the purchase</button>
                                        </div>
                                        <div className={st.buttons}>
                                            <button className={buttons.buttonActive} onClick={() => history.push("/")}  >Continue shopping</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order