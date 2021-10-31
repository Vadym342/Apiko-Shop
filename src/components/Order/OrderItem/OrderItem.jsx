import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    cartArraySelector, cartBubbleSelector, completedOrderArraySelector, deleteCartarray,
    deleteCompletedOrderArray, setCartBubble, setCompletedOrderArray
} from '../../../store';
import st from './OrderItem.module.css';
import dump from '../../../Icons/dump.svg';


const OrderItem = (props) => {
    const dispatch = useDispatch();

    const cartBubble = useSelector(cartBubbleSelector);
    const cartArray = useSelector(cartArraySelector);
    const completedOrdereArray = useSelector(completedOrderArraySelector);

    const handleInitCount = () => {
        const cartItem = cartArray.find(item => item.id === props.item.id);
        return cartItem ? cartItem.count : 0;
    }
    const handleInitPrice = () => {
        const cartItem = cartArray.find(item => {
            if (item.id === props.item.id) {
                return item.totalPrice;
            }
        });
        return cartItem ? cartItem.totalPrice : 0;
    }
    const [count, setCount] = useState(handleInitCount());
    const [price, setPrice] = useState(handleInitPrice());

    const minItem = () => {
        if (count > 1) {
            setCount(count - 1);
            props.setTotalPrice(props.totalPrice - props.item.price)
            setPrice(price - props.item.price);
        }
    }
    const plusItem = () => {
        if (count < 25) {
            setCount(count + 1);
            props.setTotalPrice(props.totalPrice + props.item.price)
            setPrice(price + props.item.price);
        }
    }
    const deleteOrderItem = () => {
        props.setTotalPrice(props.totalPrice - price);
        props.setCount(props.count - 1);
        dispatch(setCartBubble(cartBubble - 1));
        dispatch(deleteCartarray(props.item.id));
    }
    useEffect(() => {
        const order = completedOrdereArray.find(item => item.product.id === props.item.id);
        if (order) {
            dispatch(setCompletedOrderArray({
                product: props.item,
                quantity: count,
                orderedPrice: price,
            }))
        }
    }, [count])

    const title = props.item.title.length > 50 ? `${props.item.title.substr(0, 50)}...` : props.item.title;
    return (
        <div className={st.flexContainer} >
            <div className={st.first}>
                <img className={st.itemImg} src={props.item.picture} alt="product" />
            </div>
            <div className={st.second}>
                <div className={st.titleBlock}>
                    <p>
                        {title}
                    </p>
                </div>
                <div className={st.buttonsBlock}>
                    <div className={st.dumpIcon}>
                        <img onClick={() => deleteOrderItem()} src={dump} alt="dump" />
                    </div>
                    <div>
                        <button className={st.buttonsCount} onClick={() => minItem()}>-</button>
                    </div>
                    <div className={st.countNum}>
                        <p>{count}</p>
                    </div>
                    <div>
                        <button className={st.buttonsCount} onClick={() => plusItem()}>+</button>
                    </div>
                </div>
            </div>
            <div className={st.third}>
                <div className={st.priceBlock}>
                    Price:
                    <p>{price}</p>
                </div>
            </div>
        </div>
    )
}
export default OrderItem