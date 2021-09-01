import st from './Login.module.css'
import { useDispatch} from 'react-redux';
import { loginUser, setCloseModal, setIsRegFormOpen} from '../../../store';
import { useState } from 'react';
import stInp from '../../../globalStyle/inputs.module.css';
import buttons from '../../../globalStyle/buttons.module.css';
import dagger from '../../../Icons/dagger.svg';


const Login = () => {
    const dispatch = useDispatch();

    const handleIsRegFormOpen = (bool) => {
        dispatch(setIsRegFormOpen(bool));
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let errorsObj = { message: '', email: '', password: '', };
    const [errors, setErrors] = useState(errorsObj);

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const emailRegex = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/);
        const errorObj = { ...errorsObj };

        if (!email) {
            errorObj.email = 'Required info is missing';
            error = true;
        } else
            if (!emailRegex.test(email)) {
                errorObj.email = 'Incorrect data, correct example: "some@example.idk"';
                error = true;
            }
        if (!password) {
            errorObj.password = 'Required info is missing';
            error = true;
        } else
            if (!passwordRegex.test(password)) {
                errorObj.password = 'Incorrect data, correct example: min-lenght = 8, "Aaaa$123", at least 1 letter, 1 special symbol, 1 number';
                error = true;
            }
        setErrors(errorObj)
        const handleReg = (obj) => {
            dispatch(loginUser(obj));
        }
        if (!error) {
            handleReg({
                email: email,
                password: password
            })
        }
    }

    return (
        <div>
            <div className={st.regblock}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={st.close} >
                        <img onClick={() => dispatch(setCloseModal(false))} src={dagger} alt="close" />
                    </div>
                    <div className={st.titleBlock}>
                        <p>Log In</p>
                    </div>
                    <div className={st.blockInputs}>
                        <div>
                            <label className={stInp.input}>
                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                    className={errors.email ? stInp.input__field__error : stInp.input__field} type="email" placeholder=" " />
                                <span className={stInp.input__label}>Email</span>
                            </label>
                            {errors.email && <div className={st.errorMessage}>{errors.email}</div>}
                        </div>
                        <div className={st.input}>
                            <label className={stInp.input}>
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    className={errors.password ? stInp.input__field__error : stInp.input__field} type="password" placeholder=" " />
                                <span className={stInp.input__label}>Password</span>
                            </label>
                            {errors.password && <div className={st.errorMessage}>{errors.password}</div>}
                        </div>
                    </div>
                    <div className={st.buttonBlock}>
                        <button className={buttons.buttonFill} type="submit">Login</button>
                    </div>
                </form>
            </div>
            <div className={st.regblock1}>
                <div className={st.textBlock}>
                    <span>I have no account,</span> <button className={st.textButton} onClick={() => {
                        handleIsRegFormOpen(true);
                    }}>Register now</button>
                </div>
            </div>
        </div>
    )
}
export default Login