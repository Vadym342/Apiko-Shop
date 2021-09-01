import React from 'react';
import st from './Registration.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { globalErrorSelector, registrationUser, setCloseModal, setIsRegFormOpen } from '../../../store';
import { useState } from 'react';
import stInp from '../../../globalStyle/inputs.module.css';
import buttons from '../../../globalStyle/buttons.module.css';
import dagger from '../../../Icons/dagger.svg';


const Registration = (props) => {
    const dispatch = useDispatch();

    const handleIsRegFormOpen = (bool) => {
        dispatch(setIsRegFormOpen(bool));
    }
    const globalError = useSelector(globalErrorSelector);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    let errorsObj = { name: '', email: '', password: '', phone: '' };
    const [errors, setErrors] = useState(errorsObj);

    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const nameRegex = new RegExp(/^[a-zA-Z\s]+/);
        const emailRegex = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/);
        const phoneRegex = new RegExp(/^(\+)?([0-9]){10,14}$/);
        const errorObj = { ...errorsObj };
        if (!name) {
            errorObj.name = 'Required info is missing';
            error = true;
        } else
            if (!nameRegex.test(name)) {
                errorObj.name = 'Incorrect data, correct example: "Vasyan Vasyan"';
                error = true;
            }
        if (!email) {
            errorObj.email = 'Required info is missing';
            error = true;
        } else
            if (!emailRegex.test(email)) {
                errorObj.email = 'Incorrect data, correct example: "some@example.idk"';
                error = true;
            } else
                if (globalError !== "") {
                    errorsObj.email = globalError;
                }
        if (!password) {
            errorObj.password = 'Required info is missing';
            error = true;
        } else
            if (!passwordRegex.test(password)) {
                errorObj.password = 'Incorrect data, correct example: min-lenght = 8, at least 1 letter, 1 special symbol, 1 number';
                error = true;
            }
        if (!phone) {
            errorObj.phone = 'Required info is missing';
            error = true;
        } else
            if (!phoneRegex.test(phone)) {
                errorObj.phone = 'Incorrect data, correct example: "+1234567890"';
                error = true;
            }
        setErrors(errorObj)
        const handleReg = (obj) => {
            dispatch(registrationUser(obj));
        }
        if (!error) {
            handleReg({
                fullName: name,
                email: email,
                password: password,
                phone: phone
            });
        }
    }
    return (
        <div>
            <div className={st.regblock}>
                <div className={st.close} >
                    <img onClick={() => dispatch(setCloseModal(false))} src={dagger} alt="close" />
                </div>
                <div className={st.titleBlock}>
                    <p>Registration</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={st.blockInputs}>
                        <div>
                            <label className={stInp.input}>
                                <input value={name} onChange={(e) => setName(e.target.value)}
                                    className={errors.name ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                <span className={stInp.input__label}>Full Name</span>
                            </label>
                            {errors.name && <div className={st.errorMessage}>{errors.name}</div>}
                        </div>
                        <div className={st.input}>
                            <label className={stInp.input}>
                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                    className={errors.name ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                <span className={stInp.input__label}>Email</span>
                            </label>
                            {globalError !== "" ? <div className={st.errorMessage}>{globalError}</div> : ""}
                            {errors.email && <div className={st.errorMessage}>{errors.email}</div>}
                        </div>
                        <div className={st.input}>
                            <label className={stInp.input}>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className={errors.name ? stInp.input__field__error : stInp.input__field} type="phone" placeholder=" " />
                                <span className={stInp.input__label}>Phone number</span>
                            </label>
                            {errors.phone && <div className={st.errorMessage}>{errors.phone}</div>}
                        </div>
                        <div className={st.input}>
                            <label className={stInp.input}>
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    className={errors.name ? stInp.input__field__error : stInp.input__field} type="password" placeholder=" " />

                                <span className={stInp.input__label}>Password</span>
                            </label>
                            {errors.password && <div className={st.errorMessage}>{errors.password}</div>}
                        </div>
                    </div>
                    <div className={st.buttonBlock}>
                        <button className={buttons.buttonFill} type="submit">Register</button>
                    </div>
                </form>
            </div>
            <div className={st.regblock1}>
                <div className={st.textBlock}>
                    <span>I already have an account,</span> <button className={st.textButton} onClick={() => {
                        handleIsRegFormOpen(false);
                    }}>Log in</button>
                </div>
            </div>
        </div>
    );
}
export default Registration;