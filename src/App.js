import './App.css';
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import { Route} from 'react-router-dom';
import Loader from './components/Loader/Loader';
import EditProfile from './components/Profile/EditProfile/EditProfile';
import Favorites from './components/Profile/Favorites/Favorites';
import OrderHistory from './components/Profile/OrderHistory/OrderHistory';
import Order from './components/Order/Order';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationPopUp from './components/NotificationPopUp/NotificationPopUp';
import { useSelector } from 'react-redux';
import { isNotificationPopUpSelector } from './store';


function App() {
  const isNotificationPopUp = useSelector(isNotificationPopUpSelector);
  return (
    <div>
      <Navbar />
      <div>
        <Route path="/" exact render={() =>
          <HomePage />
        } />
      </div>
      <div>
        <ProtectedRoute exact path="/cart"
          component={Order}
        />
      </div>
      <div>
        <ProtectedRoute exact path="/profile/settings"
          component={EditProfile}
        />
      </div>
      <div>
        <ProtectedRoute path="/profile/favorite"
          component={Favorites}
        />
      </div>
      <div>
        <ProtectedRoute path="/profile/order/history"
          component={OrderHistory
          } />
      </div>
      <div>
        <Loader />
      </div>
      <div>
        <Route path="*" render={()=>""} />
      </div>
      {
        isNotificationPopUp ? <NotificationPopUp
        /> : ""
      }
      <Footer />
    </div>
  );
}

export default App;
