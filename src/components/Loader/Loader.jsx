import { useSelector } from 'react-redux';
import { isLoaderSelector } from '../../store';
import st from './Loader.module.css';

const Loader = () => {
    const isLoader = useSelector(isLoaderSelector);
    return (
        <div className={st.pos}>
            {
                isLoader ? <div> <div className={st.ldSpinner}><div></div><div></div><div>
                </div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <div className={st.text}>
                        <h3 >
                            Searching...
                        </h3>
                    </div>
                </div> : ""
            }
        </div>
    )
}

export default Loader
