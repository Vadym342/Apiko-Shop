import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../../store/action';
import { orderHistorySelector } from '../../../store/selectors';
import Profile from '../Profile';
import DetailOrderItem from './DetailOrderItem/DetailOrderItem';
import OrderHistoryItem from './DetailOrderItem/OrderHistoryItem/OrderHistoryItem';
import st from './OrderHistory.module.css';


const OrderHistory = (props) => {
    const dispatch = useDispatch();
    const orderHistory = useSelector(orderHistorySelector);
    const [selectedSingleOrder, setSelectedSingleOrder] = useState(null);
    const handleFetchOrderHistory = () => {
        dispatch(getOrderHistory());
    }

    useEffect(() => {
        handleFetchOrderHistory();
    }, [])

    return (
        <div className={st.editBlock}>
            <div className={st.mainContent}>
                <div>
                    <Profile />
                </div>
                <div className={st.blockItems}>
                    {
                        orderHistory.length === 0 ? <div><h3>Currently you have no orders</h3></div> :
                            orderHistory.map(el => (
                                <DetailOrderItem
                                    key={el.id}
                                    {...el}
                                    el={el}
                                    setSelectedSingleOrder={setSelectedSingleOrder}
                                    selectedSingleOrder={selectedSingleOrder}
                                    closePopUp={() => setSelectedSingleOrder(null)}
                                    openSingleItem={setSelectedSingleOrder}
                                />

                            ))
                    }
                </div>
            </div>
            {
                selectedSingleOrder && (
                    <OrderHistoryItem item={selectedSingleOrder}
                        closePopUp={() => setSelectedSingleOrder(null)}
                    />
                )
            }
        </div>
    )
}
export default OrderHistory