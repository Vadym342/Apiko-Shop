
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setLogout } from '../../../store';
import st from './ProfilePopUp.module.css';


const ProfilePopUp = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setLogout());
        props.setIsProfileOpen(false);
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            <div className={st.pos}>
                <div className={st.title}>
                    <h4 className={st.h4}>{props.user.fullName}</h4>
                </div>
                <div className={st.email}>
                    <h4 className={st.h4}>{props.user.email}</h4>
                </div>
                <hr className={st.hr} />
                <div className={st.settings}>
                    <Link to="/profile/settings" onClick={() => props.setIsProfileOpen(false)} className={st.settingsLink}>
                        <div className={st.h3}>
                            Settings
                        </div>
                    </Link>
                </div>
                <div className={st.logout} onClick={handleLogout}>
                    <h3 className={st.h3}>Log Out</h3>
                </div>
            </div>
        </div>
    )
}
export default ProfilePopUp