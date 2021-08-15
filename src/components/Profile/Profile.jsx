import { Link } from "react-router-dom";
import st from './Profile.module.css';

const Profile = (props) => {
    return (
        <div>
            <div>
                <img alt="userLogo" />
                Img
            </div>
            <div>
                <h3>Name</h3>
            </div>
            <div className={st.blockLink}>
            <Link to="/profile/settings" >
                Edit Account
            </Link>
            <Link to="/profile/order/history">
                Orders History
            </Link>
            <Link to="/profile/favorite">
                Favorites
            </Link>
            </div>
        </div>
    )
}
export default Profile;