import { useDispatch, useSelector } from "react-redux"
import { offsetSelector, setOffset } from "../../store";
import st from './Pagination.module.css';


const Pagination =()=>{
    const dispatch = useDispatch();
    const offset = useSelector(offsetSelector);
    const handleLoadMore =()=>{
        dispatch(setOffset(offset+12));
    }
    return(
        <div>
            <button className={st.button} onClick={()=>handleLoadMore()}> 
                Load more...
            </button>
        </div>
    )
}

export default Pagination