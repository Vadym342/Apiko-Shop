import Profile from '../Profile';
import st from './EditProfile.module.css';
import stInp from '../../../globalStyle/inputs.module.css';
import buttons from '../../../globalStyle/buttons.module.css';
import { countrySelector, fetchCountries, getUser, globalErrorSelector, putUser, putUserPassword, setIsNotificationPopUp, setNotificationBoldMessage, setNotificationMessage, userSelector } from '../../../store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const userAccount = user.account;
    const countries = useSelector(countrySelector);
    const globalError = useSelector(globalErrorSelector);

    const [fullName, setFullName] = useState(userAccount.fullName);
    const [email, setEmail] = useState(userAccount.email);
    const [phone, setPhone] = useState(userAccount.phone);
    const [country, setCountry] = useState(!userAccount.country ? 'Afghanistan' : userAccount.country);
    const [city, setCity] = useState(!userAccount.city ? '' : userAccount.city);
    const [address, setAddress] = useState(!userAccount.address ? '' : userAccount.address);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let errorsObj = { message: '', fullName: '', phone: '', city: '', address: '', email: '', confirmPassword: '', password: '', newPassword: '' };
    const [errors, setErrors] = useState(errorsObj);
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }

    const handleCountry = () => {
        dispatch(fetchCountries());
    }
    const handleChangeUserInfo = (e) => {
        e.preventDefault();
        let error = false;
        const nameRegex = new RegExp(/^[a-zA-Z\s]+/);
        const emailRegex = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        const phoneRegex = new RegExp(/^(\+)?([0-9]){10,14}$/);
        const errorObj = { ...errorsObj };
        if (!fullName) {
            errorObj.fullName = 'Required info is missing';
            error = true;
        } else
            if (!nameRegex.test(fullName)) {
                errorObj.fullName = 'Incorrect data, correct example: "Vasyan Vasyan"';
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
        if (!phone) {
            errorObj.phone = 'Required info is missing';
            error = true;
        } else
            if (!phoneRegex.test(phone)) {
                errorObj.phone = 'Incorrect data, correct example: "+1234567890"';
                error = true;
            }
        if (!city) {
            errorObj.city = 'Required info is missing';
            error = true;
        }
        if (!address) {
            errorObj.address = 'Required info is missing';
            error = true;
        }
        setErrors(errorObj);
        const handleChangeInfo = (obj) => {
            dispatch(putUser(obj));
        }
        if (!error) {
            dispatch(setIsNotificationPopUp(true));
            dispatch(setNotificationBoldMessage("Profile info"));
            dispatch(setNotificationMessage("has been successfully chanched"));
            handleChangeInfo({
                fullName: fullName,
                email: email,
                phone: phone,
                country: country,
                city: city,
                address: address
            });
            dispatch(getUser(headers));
        }

    }
    const handleChangeUserPassword = (e) => {
        e.preventDefault();
        let error = false;
        const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/);
        const errorObj = { ...errorsObj };
        if (!currentPassword) {
            errorObj.password = 'Required info is missing';
            error = true;
        } else
            if (!passwordRegex.test(currentPassword)) {
                errorObj.password = 'Incorrect data, correct example: min-lenght = 8, at least 1 letter, 1 special symbol, 1 number';
                error = true;
            }
        if (!newPassword) {
            errorObj.newPassword = 'Required info is missing';
            error = true;
        } else
            if (newPassword !== confirmPassword) {
                errorObj.newPassword = 'Passwords don’t match';
                error = true;
            } else
                if (!passwordRegex.test(newPassword)) {
                    errorObj.newPassword = 'Incorrect data, correct example: min-lenght = 8, at least 1 letter, 1 special symbol, 1 number';
                    error = true;
                }
        if (!confirmPassword) {
            errorObj.confirmPassword = 'Required info is missing';
            error = true;
        }
        setErrors(errorObj)
        const handleChangePassword = (obj) => {
            dispatch(putUserPassword(obj))
        }
        if (!error) {
            dispatch(setIsNotificationPopUp(true));
            dispatch(setNotificationBoldMessage("Password"));
            dispatch(setNotificationMessage("has been successfully chanched"));
            handleChangePassword({
                oldPassword: currentPassword,
                password: newPassword
            })
            dispatch(getUser(headers));
        }
    }
    useEffect(() => {
        handleCountry();
    }, [])
    useEffect(() => {

    }, [user])
    return (
        <div className={st.editBlock}>
            <div className={st.mainContent}>
                <div>
                    <Profile />
                </div>

                <div>
                    <div>
                        <div className={st.text}>
                            <p>Main information</p>
                        </div>
                        <div className={st.userInfoBlock}>
                            <form onSubmit={(e) => handleChangeUserInfo(e)}>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={fullName} onChange={e => setFullName(e.target.value)}
                                            className={errors.fullName ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>Full Name</span>
                                    </label>
                                    {errors.fullName && <div className={st.errorMessage}>{errors.fullName}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={email} onChange={e => setEmail(e.target.value)}
                                            className={errors.email ? stInp.input__field__error : stInp.input__field} type="email" placeholder=" " />
                                        <span className={stInp.input__label}>Email</span>
                                    </label>
                                    {globalError !== "" ? <div className={st.errorMessage}>{globalError}</div> : ""}
                                    {errors.email && <div className={st.errorMessage}>{errors.email}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={phone} onChange={e => setPhone(e.target.value)}
                                            className={errors.phone ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>Phone</span>
                                    </label>
                                    {errors.phone && <div className={st.errorMessage}>{errors.phone}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <select className={stInp.input__field} defaultValue={country} onChange={e => setCountry(e.target.value)}>
                                            <option>{country}</option>
                                            {
                                                countries.map((country, index) => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))
                                            }
                                        </select>
                                        <span className={stInp.input__label}>Country</span>
                                    </label>
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={city} onChange={e => setCity(e.target.value)}
                                            className={errors.city ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>City</span>
                                    </label>
                                    {errors.city && <div className={st.errorMessage}>{errors.city}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={address} onChange={e => setAddress(e.target.value)}
                                            className={errors.address ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>Address</span>
                                    </label>
                                    {errors.address && <div className={st.errorMessage}>{errors.address}</div>}
                                </div>
                                <div className={st.buttons}>
                                    <button className={buttons.buttonFill} type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                        <div className={st.text}>
                            <p>Change Password</p>
                        </div>
                        <div className={st.userInfoBlock}>
                            <form onSubmit={(e) => handleChangeUserPassword(e)}>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                                            className={errors.password ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>Current password</span>
                                    </label>
                                    {errors.password && <div className={st.errorMessage}>{errors.password}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                            className={errors.newPassword ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>New password</span>
                                    </label>
                                    {errors.password && <div className={st.errorMessage}>{errors.password}</div>}
                                </div>
                                <div className={st.input}>
                                    <label className={stInp.input}>
                                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                            className={errors.confirmPassword ? stInp.input__field__error : stInp.input__field} type="text" placeholder=" " />
                                        <span className={stInp.input__label}>Confirm password</span>
                                    </label>
                                    {errors.confirmPassword && <div className={st.errorMessage}>{errors.confirmPassword}</div>}
                                </div>
                                <div className={st.buttons}>
                                    <button className={buttons.buttonFill} type="submit">Change password</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default EditProfile