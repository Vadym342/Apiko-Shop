
import { useDispatch, useSelector } from 'react-redux';
import { closeModalSelector, isRegFormOpenSelector, setCloseModal, setIsGuestPopUp, setIsRegFormOpen } from '../../../store';
import Registration from '../Registration/Registration';
import Modal from '../../Modal/Modal';
import Login from '../Login/Login';
import st from './GuestPopUp.module.css';
import dagger from '../../../Icons/dagger.svg';
import buttonSt from '../../../globalStyle/buttons.module.css';


const GuestPopUp = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(closeModalSelector);
    const handleLogIn = (isRegFormOpen) => {
        dispatch(setIsGuestPopUp(false))
        dispatch(setCloseModal(true));
        dispatch(setIsRegFormOpen(isRegFormOpen));
    }
    const handleRegistration = (isRegFormOpen) => {
        dispatch(setIsGuestPopUp(false))
        dispatch(setCloseModal(true));
        dispatch(setIsRegFormOpen(isRegFormOpen));
    }
    const isRegFormOpen = useSelector(isRegFormOpenSelector);
    return (
        <div className={st.pos}>
            <div className={st.close} >
                <img onClick={() => dispatch(setIsGuestPopUp(false))} src={dagger} alt="close" />
            </div>
            <div className={st.blockButtons}>
                <div className={st.title}>
                    <h3>To continue please register or log in</h3>
                </div>
                <div className={st.button}>
                    <button className={buttonSt.buttonFill} onClick={() => handleLogIn(false)}>
                        Continue to sign in
                    </button>
                </div>
                <div className={st.button}>
                    <button className={buttonSt.buttonFill} onClick={() => handleRegistration(true)}>
                        Continue to register
                    </button>
                </div>
                <div className={st.button}>
                    <button className={buttonSt.buttonActive} onClick={() => dispatch(setIsGuestPopUp(false))}>
                        Continue as guest
                    </button>
                </div>
                <Modal isOpen={isOpen}>
                    {
                        isRegFormOpen ? <Registration /> : <Login />
                    }
                </Modal>
            </div>
        </div>
    )
}
export default GuestPopUp
