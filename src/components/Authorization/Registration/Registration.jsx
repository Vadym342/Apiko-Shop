import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import st from './Registration.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { globalErrorSelector, registrationUser, setCloseModal, setIsRegFormOpen } from '../../../store';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(0, 0, 2),
    },
    height: {
        height: '50px'
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const Registration = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues((prevState)=>({ ...prevState, [prop]: event.target.value }));
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                errorObj.password = 'Incorrect data, correct example: min-lenght = 8, "Aaaa$123", at least 1 letter, 1 special symbol, 1 number';
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
            console.log('form submit');
        }
    }

    return (
        <div>
            <div className={st.regblock}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div onClick={() => dispatch(setCloseModal(false))}>
                        X
                    </div>
                    <div>
                        <h3>Registration</h3>
                    </div>
                    <div>
                        <TextField
                            id="outlined-secondary"
                            className={classes.margin, classes.height}
                            label="Full Name"
                            variant="outlined"
                            type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                        <TextField
                            id="outlined-secondary"
                            label="Email"
                            className={classes.margin, classes.height}
                            variant="outlined"
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        {globalError !== "" ? <div>{globalError}</div> : ""}
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div>
                        <TextField
                            id="outlined-secondary"
                            label="Phone"
                            variant="outlined"
                            className={classes.margin}
                            type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
                        {errors.phone && <div>{errors.phone}</div>}
                    </div>
                    <div>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color="secondary"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        {errors.password && <div>{errors.password}</div>}
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
            <div className={st.regblock1}>
                <div>
                    <span>I already have an account,</span> <button onClick={() => {
                        handleIsRegFormOpen(false);
                    }}>Log in</button>
                </div>
            </div>
        </div>
    );
}
export default Registration;