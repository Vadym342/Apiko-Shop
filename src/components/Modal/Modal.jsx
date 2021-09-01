import ReactDOM from 'react-dom';


const Modal = (props) => {
    return props.isOpen && ReactDOM.createPortal(
        <div>
            {props.children}
        </div>, document.getElementById('modal')
    );
}
export default Modal