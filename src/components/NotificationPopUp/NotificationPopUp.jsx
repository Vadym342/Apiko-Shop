import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationBoldMessageSelector, notificationMessageSelector, setIsNotificationPopUp } from '../../store';
import st from './NotificationPopUp.module.css';

const NotificationPopUp = () => {
    const dispatch = useDispatch();
    const BoldMessage = useSelector(notificationBoldMessageSelector);
    const Message = useSelector(notificationMessageSelector);
    const handleCloseButton = () => {
        dispatch(setIsNotificationPopUp(false))
    }
    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsNotificationPopUp(false))
        }, 3000)
    }, []);
    return (
        <div className={st.pos}>
            <div className={st.message}> The
                <h4 className={st.boldMessage} >
                    {
                        BoldMessage
                    }
                </h4>
                {
                    Message
                }
                <button className={st.buttonClose} onClick={() => handleCloseButton()}>
                    X
                </button>
            </div>
        </div >
    )
}
export default NotificationPopUp