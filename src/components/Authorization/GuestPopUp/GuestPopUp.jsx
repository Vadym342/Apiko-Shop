
import { useDispatch, useSelector } from 'react-redux';
import { closeModalSelector, isRegFormOpenSelector, setCloseModal, setIsGuestPopUp, setIsLoginFormOpen, setIsRegFormOpen } from '../../../store';
import Registration from '../Registration/Registration';
import Modal from '../../Modal/Modal';
import Login from '../Login/Login';
import st from './GuestPopUp.module.css';

const GuestPopUp = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(closeModalSelector);
    const handleLogIn = (bool) => {
        dispatch(setIsGuestPopUp(false))
        dispatch(setCloseModal(true));
        dispatch(setIsRegFormOpen(bool));
    }
    const handleRegistration = (bool) =>{
        dispatch(setIsGuestPopUp(false))
        dispatch(setCloseModal(true));
        dispatch(setIsRegFormOpen(bool));
    }
    const isRegFormOpen = useSelector(isRegFormOpenSelector);
    return (
        <div className={st.pos}>
            <div onClick={() => dispatch(setIsGuestPopUp(false))}>
                <h1>X</h1>
            </div>
            <div>
                <h3>To continue please register or log in</h3>
            </div>
            <button onClick={() => handleLogIn(false)}>
                Continue to sign in
            </button>
            <button  onClick={() => handleRegistration(true)}>
                Continue to register
            </button>
            <button onClick={() => dispatch(setIsGuestPopUp(false))}>
                Continue as guest
            </button>
            <Modal isOpen={isOpen}>
                {
                    isRegFormOpen ? <Registration/> : <Login />
                }
            </Modal>
        </div>
    )
}
export default GuestPopUp
