import './App.css';
import Navbar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import { Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import EditProfile from './components/Profile/EditProfile/EditProfile';
import Favorites from './components/Profile/Favorites/Favorites';
import OrderHistory from './components/Profile/OrderHistory/OrderHistory';
import Order from './components/Order/Order';


function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Route path="/" exact render={() =>
          <HomePage />
        } />
      </div>
      <div>
        <Route path="/cart" render={() =>
          <Order />
        }
        />
      </div>
      <div>
        <Route path="/profile/settings" render={() =>
          <EditProfile />
        } />
      </div>
      <div>
        <Route path="/profile/favorite" render={() =>
          <Favorites />
        } />
      </div>
      <div>
        <Route path="/profile/order/history" render={() =>
          <OrderHistory />
        } />
      </div>

      <div>
        <Loader />
      </div>

      <Footer />
    </div>
  );
}

export default App;
