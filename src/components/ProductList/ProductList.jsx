import st from './ProductList.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsHeart } from "@react-icons/all-files/bs/BsHeart";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteById, isGuestPopUpSelector, postFavoriteById, setIsGuestPopUp, userSelector } from '../../store';
import { useEffect } from 'react';
import GuestPopUp from '../Authorization/GuestPopUp/GuestPopUp';
const ProductListRender = (props) => {
    const [toggleHeart, setToggleHeart] = useState(props.favorite);
    const [substr, setSubStr] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const isGuestPopUp = useSelector(isGuestPopUpSelector);
    const handleSetFavorite = () => {
        if (user !== null) {
            if (!toggleHeart) {
                setToggleHeart(true);
                dispatch(postFavoriteById(props.id));
            }
            if (toggleHeart) {
                setToggleHeart(false);
                dispatch(deleteFavoriteById(props.id));
            }
        } else {
            dispatch(setIsGuestPopUp(true));
        }
    }
    const title = props.title.length > 50 ? `${props.title.substr(0, 50)}...` : props.title;
    return (
        <div className={st.card}>
            <span className={st.buttons} onClick={() => { props.openSingleItem(props.item) }}>
                {/* <div className={st.block}>
                    <h3>Сlick to read more</h3>
                </div> */}
                <img className={st.img} src={props.picture} alt="Shoes" />
            </span>
            <div className={st.button}>
                <h4 className={st.title}>{title} {substr ? "..." : ""}</h4>
            </div>
            <div className={st.button}>
                <div>
                    <h4>${props.price}</h4>
                </div>
                <div>
                    <button className={st.buttonHeart} onClick={() => handleSetFavorite()}>
                        <BsHeart color={toggleHeart ? "red" : ""} />
                    </button>
                </div>
            </div>
            {
                isGuestPopUp ? <GuestPopUp /> : ""
            }
        </div>
    );
}
export default ProductListRender