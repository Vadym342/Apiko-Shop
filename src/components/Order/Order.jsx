import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { cartArraySelector, countrySelector, fetchCountries, getProductsByArray, orderListSelector, userSelector } from '../../store';
import OrderItem from './OrderItem/OrderItem';
import st from './Order.module.css'

const Order = () => {
    const dispatch = useDispatch();

    const user = useSelector(userSelector);
    const countries = useSelector(countrySelector);
    const OrderList = useSelector(orderListSelector);
    const cartArray = useSelector(cartArraySelector);
    console.log(cartArray)
    console.log(OrderList)
    const handleFetchOrderProducts = () => {
        dispatch(getProductsByArray());
    }
    const handleCountry = () => {
        dispatch(fetchCountries());
    }
    const userAccount = user.account;
    const [fullName, setFullName] = useState(userAccount.fullName);
    const [country, setCountry] = useState(userAccount.country);
    const [city, setCity] = useState(!userAccount.city ? '' : userAccount.city);
    const [address, setAddress] = useState(!userAccount.address ? '' : userAccount.address);
    const [phone, setPhone] = useState(userAccount.phone);
    const [count,setCount ] = useState(cartArray.length-1);
    const [totalPrice, setTotalPrice] = useState(() => {
        let Total = 0;
        for (let item in cartArray) {
            Total += cartArray[item].totalPrice;
        }
        return Total
    })

    console.log(`Total price: ${totalPrice}`);
    const handleSubmit = () => {

    }
    useEffect(() => {
        handleFetchOrderProducts();
        handleCountry();
    }, [])
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
                                            totalPrice={totalPrice}
                                            setTotalPrice={setTotalPrice}
                                            key={item.id}
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
                                <div>
                                    <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
                                </div>
                                <div>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
                                </div>
                                <div>
                                    <select className={st.selectCountry} defaultValue="Choose Country" onChange={e => setCountry(e.target.value)}>
                                        {
                                            countries.map((country, index) => (
                                                <option key={country} value={country}>{country}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <input value={city} onChange={e => setCity(e.target.value)} placeholder={!city ? "Enter City" : city} />
                                </div>
                                <div>
                                    <input value={address} onChange={e => setAddress(e.target.value)} placeholder={!address ? "Enter Address" : address} />
                                </div>
                                <div>
                                    <div>
                                        Items : {count}
                                    </div>
                                    <div>
                                        <h4>Total</h4> <span>${totalPrice}</span>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" disabled={!user ? true : false}>Confirm the purchase</button>
                                </div>
                                <div>
                                    <button >Continue shopping</button>
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