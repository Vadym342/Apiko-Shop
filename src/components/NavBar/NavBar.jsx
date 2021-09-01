
import st from './NavBar.module.css';
import Logofull from '../../Icons/Logofull.svg'
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { HiShoppingCart } from "@react-icons/all-files/hi/HiShoppingCart";
import { HiOutlineChevronDown } from "@react-icons/all-files/hi/HiOutlineChevronDown";
import { HiOutlineChevronUp } from "@react-icons/all-files/hi/HiOutlineChevronUp";
import Registration from '../Authorization/Registration/Registration';
import Login from '../Authorization/Login/Login';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeModalSelector, isLoginFormOpenSelector,
    isRegFormOpenSelector, setIsLoginFormOpen, setIsRegFormOpen,
    setCloseModal, userSelector, isGuestPopUpSelector,
    setIsGuestPopUp, cartBubbleSelector, getUser
} from '../../store';
import Ellipse from '../../Icons/Ellipse.svg';
import ProfilePopUp from './ProfilePopUp/ProfilePopUp';
import { Link, useHistory } from 'react-router-dom';
import GuestPopUp from '../Authorization/GuestPopUp/GuestPopUp';


const Navbar = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const isRegFormOpen = useSelector(isRegFormOpenSelector);
    const isLoginFormOpen = useSelector(isLoginFormOpenSelector);
    const isOpen = useSelector(closeModalSelector);
    const user = useSelector(userSelector);
    const isGuestPopUp = useSelector(isGuestPopUpSelector);
    const cartBubble = useSelector(cartBubbleSelector);
    
    const handleIsRegFormOpen = (bool) => {
        dispatch(setCloseModal(true));
        dispatch(setIsRegFormOpen(bool));
    }
    const handleIsLoginFormOpen = (bool) => {
        dispatch(setCloseModal(true))
        dispatch(setIsLoginFormOpen(bool));
    }

    const handleFavorite = () => {
        if (user === null) {
            dispatch(setIsGuestPopUp(true));
        }
        else {
            history.push("/profile/favorite");
        }
    }

    const handleCart = () => {
        if (user === null) {
            dispatch(setIsGuestPopUp(true));
        } else {
            history.push("/cart");
        }
    }
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className={st.nav}>
            <Link to="/" className={st.logo}>
                <img src={Logofull} alt="logo" />
            </Link>
            <div className={st.nav2}>
                <div className={st.blockHeart} >
                    <AiFillHeart className={st.heartIcon} onClick={() => handleFavorite()} size="18px" />
                </div>
                <div className={st.cart} >
                    <HiShoppingCart className={st.shoppingCartIcon} onClick={() => handleCart()} size="18px" />
                    {
                        cartBubble > 0 ?
                            <div className={st.cartButtble}><button className={st.bubbleBtn}>{cartBubble}</button></div> : ""
                    }
                </div>
                {
                    !user ?
                        <div className={st.nav3}>
                            <div className={st.regBtn}>
                                <button className={st.authBtn}
                                    onClick={() => isLoginFormOpen ? handleIsLoginFormOpen(false) : handleIsRegFormOpen(true)
                                    }>REGISTER</button>

                                <Modal isOpen={isOpen}>
                                    {
                                        isRegFormOpen ? <Registration /> : <Login />
                                    }
                                </Modal>
                            </div>
                            <div className={st.hrDiv}>
                                |
                            </div>
                            <div className={st.loginBtn}>
                                <button className={st.authBtn}
                                    onClick={() => isRegFormOpen ? handleIsRegFormOpen(false) : handleIsLoginFormOpen(true)}>LOG IN</button>
                            </div>
                        </div>

                        : <div className={st.logined}>
                            <div className={st.loginedText}>
                                Welcome, {user.account.fullName}!
                            </div>
                            <div className={st.loginedImg} onClick={() => isProfileOpen ? setIsProfileOpen(false) : setIsProfileOpen(true)}>
                                <img src={Ellipse} alt='Ellipse' />
                            </div>
                            <div className={st.vectorBlock} onClick={() => isProfileOpen ? setIsProfileOpen(false) : setIsProfileOpen(true)}>
                                {
                                    isProfileOpen ? <HiOutlineChevronUp className={st.chevronIcon} size="19px" /> : <HiOutlineChevronDown className={st.chevronIcon} size="19px" />
                                }
                            </div>
                            {
                                isProfileOpen ? <ProfilePopUp user={user.account} setIsProfileOpen={setIsProfileOpen} /> : ""
                            }
                        </div>
                }
            </div>
            {
                isGuestPopUp ? <GuestPopUp /> : ""
            }
        </nav >
    )
}
export default Navbar