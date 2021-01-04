import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { SIGNIN_USER } from "../../Queries/user";

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const [signInUser] = useMutation(SIGNIN_USER);
    const [errors, setErrors] = useState({});
    let token = localStorage.getItem(ACCESS_TOKEN_NAME);
    useEffect(() => {
        if (token) {
            props.history.push('/Listbook')
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const payload = {
            "email": state.email,
            "password": state.password,
        }
        let validForm = await validateForm(state);
        let userData = '';
        try {
            if (Object.keys(validForm).length === 0) {
                userData = await signInUser({
                    variables: payload
                });
                console.log('userData.data', userData.data)
                if (userData.data && userData.data.signInUser.token) {
                    localStorage.setItem(ACCESS_TOKEN_NAME, userData.data.signInUser.token);
                    redirectToHome();
                    props.showError(null)
                }
            }
        } catch (errors) {
            props.showError(errors.message);
        }
    }

    const validateForm = async (state) => {
        let errors = {};
        let { email, password } = state;
        if (email === '') {
            errors.email = 'Email address field is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (password === '') {
            errors.password = 'Password field is required';
        }
        await setErrors(errors);
        return errors;
    };

    const redirectToHome = () => {
        props.updateTitle('List Book')
        props.history.push('/Listbook');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.email && <label className="validation-errors">{errors.email}</label>}
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.password && <label className="validation-errors">{errors.password}</label>}
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmitClick(e)}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);