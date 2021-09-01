import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    cartArraySelector, cartBubbleSelector, deleteFavoriteById,
    isGuestPopUpSelector, postFavoriteById, setCartArray,setCartBubble, setIsGuestPopUp, 
    setIsNotificationPopUp, setNotificationBoldMessage, setNotificationMessage, userSelector
} from '../../../store';
import GuestPopUp from '../../Authorization/GuestPopUp/GuestPopUp';
import dagger from '../../../Icons/dagger.svg';
import st from './ProductDesc.module.css';
import buttonSt from '../../../globalStyle/buttons.module.css';


const ProductDesc = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const tmpPrice = props.item.price;
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(tmpPrice);
    const [isFavorite, setIsFavorite] = useState(props.item.favorite);
    const isGuestPopUp = useSelector(isGuestPopUpSelector);
    const cartList = useSelector(cartArraySelector);
    const cartBubble = useSelector(cartBubbleSelector);
    const user = useSelector(userSelector);

    const minItem = () => {
        if (count > 1) {
            setCount(count - 1);
            setTotal(total - tmpPrice);
        }
    }
    const plusItem = () => {
        if (count < 25) {
            setCount(count + 1);
            setTotal(total + tmpPrice);
        }
    }
    const handleRemoveFavorite = () => {
        setIsFavorite(false);
        dispatch(deleteFavoriteById(props.item.id));
    }
    const handleAddToFavorite = () => {
        if (!user) {
            dispatch(setIsGuestPopUp(true));
        } else {
            setIsFavorite(true);
            dispatch(postFavoriteById(props.item.id));
        }
    }

    const handleAddtoCart = () => {
        props.closePopUp();
        dispatch(setIsNotificationPopUp(true));
        dispatch(setCartBubble(cartBubble + 1));
        dispatch(setCartArray({
            id: props.item.id,
            count: count,
            totalPrice: total,
        }));

        dispatch(setNotificationBoldMessage(props.item.title.substr(0, 20)));
        dispatch(setNotificationMessage("is successfully added to cart"));
    }
    const handleBuy = () => {
        props.closePopUp();
        dispatch(setIsNotificationPopUp(true));
        dispatch(setCartBubble(cartBubble + 1));
        dispatch(setNotificationBoldMessage(props.item.title.substr(0, 20)));
        dispatch(setNotificationMessage(" is successfully added to cart"));
        dispatch(setCartArray({
            id: props.item.id,
            count: count,
            totalPrice: total,
        }));
        history.push("/cart");
    }

    return (
        <div>
            <div className={st.pos}>
                <div className={st.close} >
                    <img onClick={props.closePopUp} src={dagger} alt="close" />
                </div>
                <div className={st.flexContainer}>
                    <div className={st.first}>
                        <img className={st.imgItem} src={props.item.picture} />
                    </div>
                    <div className={st.second}>
                        <div className={st.ptName}>
                            <h3>{props.item.title}</h3>
                        </div>
                        <div className={st.ptCategory}>
                            <div className={st.allText}>
                                <p>{props.item.category.name}</p>
                            </div>
                        </div>
                        <div className={st.priceBlock}>
                            <div className={st.priceText}>
                                <p>PRICE</p>
                            </div>
                            <div className={st.priceSpan}>
                                <span>${tmpPrice}</span>
                            </div>
                        </div>
                        <div className={st.buttonsBlock}>
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

                        <div>
                            <div className={st.priceBlock}>
                                <div className={st.allText}>
                                    <p>Items:</p>
                                </div>
                                <div className={st.itemCount}>
                                    <span>1</span>
                                </div>
                            </div>
                            <div className={st.priceBlock}>
                                <div className={st.allText}>
                                    <p>Total:</p>
                                </div>
                                <div className={st.itemCount}>
                                    <span>${total}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={st.flexButton}>
                    <div className={st.buttonBlock}>
                        <button className={buttonSt.buttonActive} onClick={() => handleAddtoCart()}>ADD TO CART</button>
                    </div>
                    <div className={st.buttonBlock}>
                        {
                            isFavorite ? <button className={buttonSt.buttonFill} onClick={() => handleRemoveFavorite()}>REMOVE FROM FAVORITE</button> :
                                <button className={buttonSt.buttonActive} onClick={() => handleAddToFavorite()}>ADD TO FAVORITES</button>
                        }
                    </div>
                    <div className={st.buttonBlock}>
                        <button className={buttonSt.buttonFill} onClick={() => handleBuy()} >BUY NOW</button>
                    </div>
                </div>
            </div>
            {
                isGuestPopUp ? <GuestPopUp /> : ""
            }

        </div>
    )
}
export default ProductDesc