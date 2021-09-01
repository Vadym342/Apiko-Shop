import st from './DetailOrderItem.module.css'

const DetailOrderItem = (props) => {
    return (
        <div className={st.elBLock}>
            <div>
                <div className={st.blockText}>
                    <div>
                        <p>Order ID:</p>
                    </div>
                    <div onClick={() => { props.setSelectedSingleOrder(props.el) }}>
                        <span
                            className={st.elText, st.linkText}>{props.el.id}</span>
                    </div>
                    <div className={st.priceBlock}>
                        <p>Price:</p> <span className={st.elText}>${props.el.totalPrice}</span>
                    </div>
                </div>
            </div>
            <div className={st.blockText}>
                <div>
                    <p>Date:</p>
                </div>
                <span className={st.elText}>{props.el.createdAt.substr(0, 10)}</span>
            </div>
        </div>
    )
}
export default DetailOrderItem