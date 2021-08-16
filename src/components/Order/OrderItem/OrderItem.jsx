import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartArraySelector, completedOrderArraySelector, deleteCompletedOrderArray, setCompletedOrderArray } from '../../../store';
import st from './OrderItem.module.css';
import dump from '../../../Icons/dump.svg';
const OrderItem = (props) => {
    const dispatch = useDispatch();


    const cartArray = useSelector(cartArraySelector);
    const completedOrdereArray = useSelector(completedOrderArraySelector);

    const handleInitCount = () => {
        for (let item in cartArray) {
            if (cartArray[item].id === props.item.id) {
                return cartArray[item].count;
            }
        }
    }
    const handleInitPrice = () => {
        for (let item in cartArray) {
            if (cartArray[item].id === props.item.id) {
                return cartArray[item].totalPrice;
            }
        }
    }

    const [count, setCount] = useState(handleInitCount());
    const [price, setPrice] = useState(handleInitPrice());
    //console.log(cartArray)
    console.log(props.item)
    //console.log(completedOrdereArray);

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
    // useEffect(() => {
    //     handleInitItemArray();
    // }, []);

    useEffect(() => {
        for (let item in cartArray) {
            if (cartArray[item].id === props.item.id) {
                for (let i = 0; i < completedOrdereArray.length; i++) {
                    if (completedOrdereArray[i].product.id === props.item.id) {
                        console.log(props.item.id)
                        dispatch(deleteCompletedOrderArray(props.item.id))
                    }
                }
                dispatch(setCompletedOrderArray({
                    product: props.item,
                    quantity: count,
                    orderedPrice: price,
                }))

            }
        }
    }, [count])

    const title = props.item.title.length > 50 ? `${props.item.title.substr(0, 50)}...` : props.item.title;
    return (
        <div>
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
                            <img src={dump} alt="dump" />
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
        </div>
    )
}
export default OrderItem