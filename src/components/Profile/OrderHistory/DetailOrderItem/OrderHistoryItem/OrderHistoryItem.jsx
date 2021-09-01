import st from './OrderHistoryItem.module.css';
import dagger from '../../../../../Icons/dagger.svg';

const OrderHistoryItem = (props) => {
    let orderedPrice;
    let quantity;
    let productArray = [];
    let address = props.item.shipment;
    let addressItem;
    let cityItem;
    let countryItem;
    for (let key in address) {
        if (key === 'address') {
            addressItem = address[key];
        }
        if (key === 'city') {
            cityItem = address[key];
        }
        if (key === 'country') {
            countryItem = address[key];
        }
    }
    const str = addressItem + ',' + cityItem + ',' + countryItem;
    console.log(str);
    props.item.items.forEach(el => {
        orderedPrice = el.orderedPrice;
        quantity = el.quantity
        productArray.push(el.product);
    })
    return (
        <div className={st.pos}>
            <div className={st.close} >
                <img onClick={props.closePopUp} src={dagger} alt="close" />
            </div>
            <div className={st.mainTxt}>
                Order details ID {props.item.id}
            </div>
            <div className={st.itemsBlock}>
                {
                    productArray.map(el => (
                        <div key={el.id}>
                            <div className={st.flexContainer} >
                                <div className={st.first}>
                                    <img className={st.itemImg} src={el.picture} alt="product" />
                                </div>
                                <div className={st.second}>
                                    <div className={st.titleBlock}>
                                        <p>
                                            {el.title}
                                        </p>
                                    </div>
                                    <div className={st.buttonsBlock}>
                                        <div className={st.countNum}>
                                            <div className={st.textQuantity}>
                                                <p>Items :</p>
                                            </div>
                                            <span className={st.numQuant}>{quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={st.third}>
                                    <div className={st.priceBlock}>
                                        Price:
                                        <p>{el.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={st.blockDate}>
                <div className={st.dateItems}>
                    <div className={st.textQuantity}>
                        <p>Date:</p>
                    </div>
                    <span className={st.spanText}>{props.item.createdAt.substr(0, 10)}</span>
                </div>
                <div className={st.dateItems}>
                    <div className={st.textQuantity}>
                        <p>Items:</p>
                    </div>
                    <span className={st.spanText}>{productArray.length}</span>
                </div>
            </div>
            <div className={st.blockDate}>
                <div className={st.dateItems}>
                    <div className={st.textQuantity}>
                        <p>Address:</p>
                    </div>
                    <span className={st.spanText}>{str}</span>
                </div>
                <div className={st.dateItems}>
                    <div className={st.textQuantity}>
                        <p>Total:</p>
                    </div>
                    <span className={st.spanText}>${orderedPrice}</span>
                </div>
            </div>
        </div>
    )
}
export default OrderHistoryItem