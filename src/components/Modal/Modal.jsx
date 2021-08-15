import ReactDOM from "react-dom";
import Loader from "../Loader/Loader";

const Modal = (props) => {
    return props.isOpen && ReactDOM.createPortal(
        <div>
            {props.children}
        </div>, document.getElementById('modal')
    );
}
export default Modal