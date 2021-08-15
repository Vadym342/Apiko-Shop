import st from './Login.module.css'
import { useDispatch } from 'react-redux';
import { loginUser, setCloseModal, setIsRegFormOpen } from '../../../store';
import { useState } from 'react';


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
                email:email,
                password:password
            })
        }
    }
    
    return (
        <div>
            <div className={st.regblock}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div onClick={()=>dispatch(setCloseModal(false))}>
                        X
                    </div>
                    <div>
                        <h3>Login</h3>
                    </div>
                    <div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        {errors.password && <div>{errors.password}</div>}
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <div className={st.regblock1}>
                <div>
                    <span>I have no account,</span> <button onClick={() => {
                        handleIsRegFormOpen(true);
                    }}>Register now</button>
                </div>
            </div>
        </div>
    )
}

export default Login