import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../common/constants';
import { setLoggedIn } from '../store/action';
import { login, signup } from './action';
import "./login.scss";

const Login = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailId, setEmailId] = useState("");
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmailId("");
        setError("");
        setPasswordVisible(false);
        setConfirmPasswordVisible(false);
    }, [props?.type])


    const onLogin = (e) => {
        setError(null);
        e.preventDefault();
        let params = {
            username: username,
            password: password
        }
        login(params).then(resp => {
            localStorage.setItem("token", resp?.data?.token);
            localStorage.setItem("username", resp?.data?.username);
            localStorage.setItem("refreshToken", resp?.data?.refreshToken);
            localStorage.setItem("isAuthorized", true);
            props.setLoggedIn(true);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }).catch(error => {
            setError(error?.response?.data);
        });
    }

    const onSignUp = (e) => {
        setError(null);
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match.")
        } else {
            let params = {
                username, password, emailId
            }
            signup(params).then(resp => {
                navigate("/login");
            }).catch(error => {
                console.error(error?.response?.data);
                setError(error?.response?.data);
            })
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className='left-panel'>
                    <div className="logo-container">
                        <Logo height="100px" width="100px" strokeWidth={1.5} />
                        <h3 className='logo-title'>Harmony</h3>
                    </div>
                    <span>Hi! Welcome to Harmony.</span>
                </div>
                <div className='right-panel'>
                    <h3>{props?.type === "login" ? "Login" : "Sign Up"}</h3>
                    {props?.type === "login" ?
                        <form className='form-container login-form' onSubmit={onLogin}>
                            <div className='field-container'>
                                <input
                                    autoFocus
                                    className='input-elem username'
                                    placeholder='Username'
                                    type={"text"}
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                    required
                                />
                            </div>
                            <div className='field-container'>
                                <input
                                    className='input-elem password'
                                    placeholder='Password'
                                    type={passwordVisible ? "text" : "password"}
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    required
                                />
                                {passwordVisible ? <VisibilityOff onClick={() => { setPasswordVisible(false) }} className="password-visibility" /> : <Visibility onClick={() => { setPasswordVisible(true) }} className="password-visibility" />}
                            </div>
                            <div className='field-container'>
                                <button type='submit'>LOGIN</button>
                            </div>
                            {!!error ?
                                <div className="field-container error-container">
                                    <span>{error}</span>
                                </div>
                                : null}
                            <div className='field-container'>
                                <span className='signup'>
                                    Don't have an account?
                                    <Link to="/signup">Sign Up here</Link>
                                </span>
                            </div>
                        </form>
                        :
                        <form className='form-container signup-form' onSubmit={onSignUp}>
                            <div className='field-container'>
                                <input
                                    autoFocus
                                    className='input-elem username'
                                    placeholder='Username'
                                    type={"text"}
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                    required
                                />
                            </div>
                            <div className='field-container'>
                                <input
                                    className='input-elem password'
                                    placeholder='Password'
                                    type={passwordVisible ? "text" : "password"}
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    required
                                />
                                {passwordVisible ? <VisibilityOff onClick={() => { setPasswordVisible(false) }} className="password-visibility" /> : <Visibility onClick={() => { setPasswordVisible(true) }} className="password-visibility" />}
                            </div>
                            <div className='field-container'>
                                <input
                                    className='input-elem confirm-password'
                                    placeholder='Confirm Password'
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    value={confirmPassword}
                                    required
                                />
                                {confirmPasswordVisible ? <VisibilityOff onClick={() => { setConfirmPasswordVisible(false) }} className="password-visibility" /> : <Visibility onClick={() => { setConfirmPasswordVisible(true) }} className="password-visibility" />}
                            </div>
                            <div className='field-container'>
                                <input
                                    className='input-elem email'
                                    placeholder='Email ID'
                                    type="email"
                                    onChange={(event) => setEmailId(event.target.value)}
                                    value={emailId}
                                    required
                                />
                            </div>
                            <div className='field-container'>
                                <button type='submit'>SIGN UP</button>
                            </div>
                            {!!error ?
                                <div className="field-container error-container">
                                    <span>{error}</span>
                                </div>
                                : null}
                            <div className='field-container'>
                                <span className='signup'>
                                    Already have an account?
                                    <Link to="/login">Login here</Link>
                                </span>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (value) => dispatch(setLoggedIn(value))
    }
}

export default connect(null, mapDispatchToProps)(Login);