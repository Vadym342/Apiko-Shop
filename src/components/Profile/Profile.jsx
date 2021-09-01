import { Link } from "react-router-dom";
import st from './Profile.module.css';
import userPhoto from '../../Icons/userPhoto.svg';
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";


const Profile = (props) => {
    const user = useSelector(userSelector);
    const url = document.URL;

    return (
        <div>
            <div className={st.userPhoto}>
                <div>
                    <div>
                        <img src={userPhoto} alt="userLogo" />
                    </div>
                    <div className={st.userName}>
                        <h3>{user.account.fullName}</h3>
                    </div>
                </div>
            </div>
            <div className={st.blockLink}>
                <Link to="/profile/settings" className={st.linkItem}>
                    <div className={url.replace(/\/$/, "").split('/').splice(-1, 1) == "settings" ? st.routeBlock : ""}>
                        <div className={st.linkText}>
                            Edit Account
                        </div>
                    </div>
                </Link>
                <Link to="/profile/order/history" className={st.linkItem}>
                    <div className={url.replace(/\/$/, "").split('/').splice(-1, 1) == "history" ? st.routeBlock : ""}>
                        <div className={st.linkText} >
                            Orders History
                        </div>
                    </div>
                </Link>
                <Link to="/profile/favorite" className={st.linkItem}>
                    <div className={url.replace(/\/$/, "").split('/').splice(-1, 1) == "favorite" ? st.routeBlock : ""}>
                        <div className={st.linkText}>
                            Favorites
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Profile;