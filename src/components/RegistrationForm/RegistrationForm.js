import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../../Queries/user";

function RegistrationForm(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const [addUser] = useMutation(ADD_USER);
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

    const sendDetailsToServer = async (e) => {
        props.showError(null);
        const payload = {
            "name": state.name,
            "email": state.email,
            "password": state.password,
        }

        try {
            let userData = '';
            userData = await addUser({
                variables: payload
            });
            if (userData.data && userData.data.createUser.token) {
                redirectToLogin();
            }
        } catch (errors) {
            props.showError(errors.message);
        }
    }

    const validateForm = async (state) => {
        let errors = {};
        let { name, email, password, confirmPassword } = state;
        if (email === '') {
            errors.email = 'Email address field is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (password === '') {
            errors.password = 'Password field is required';
        }
        if (name === '') {
            errors.name = 'Name field is required';
        }
        if (confirmPassword === '') {
            errors.confirmPassword = 'Confirm Password field is required';
        }

        if (password !== confirmPassword && confirmPassword !== '') {
            errors.confirmPassword = 'Password mismatch';
        }
        await setErrors(errors);
        return errors;
    };

    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        let validForm = await validateForm(state);
        if (Object.keys(validForm).length === 0) {
            sendDetailsToServer()
        }
    }
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleChange}
                    />
                    {errors.name && <label className="validation-errors">{errors.name}</label>}
                </div>

                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    {errors.email && <label className="validation-errors">{errors.email}</label>}
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    {errors.password && <label className="validation-errors">{errors.password}</label>}
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <label className="validation-errors">{errors.confirmPassword}</label>}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);