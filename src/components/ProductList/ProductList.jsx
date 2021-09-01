import st from './ProductList.module.css';
import { useState } from 'react';
import { BsHeart } from '@react-icons/all-files/bs/BsHeart';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteById, isGuestPopUpSelector, postFavoriteById, setIsGuestPopUp, userSelector } from '../../store';


const ProductListRender = (props) => {
    const [toggleHeart, setToggleHeart] = useState(props.favorite);
    const [substr, setSubStr] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

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
    const title = props.title.length > 40 ? `${props.title.substr(0, 40)}...` : props.title;
    return (
        <div className={st.card}>
            <span className={st.buttons} onClick={() => { props.openSingleItem(props.item) }}>

                <img className={st.img} src={props.picture} alt="Shoes" />
            </span>
            <div className={st.titleBlock}>
                <p className={st.title}>{title} {substr ? "..." : ""}</p>
            </div>
            <div className={st.priceBlock}>
                <div>
                    <p className={st.priceText}>${props.price}</p>
                </div>
                <div className={st.blockButton}>
                    <button className={st.buttonHeart} onClick={() => handleSetFavorite()}>
                        <BsHeart className={st.heartIcon} color={toggleHeart ? "red" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductListRender