import React, { useState } from 'react';
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

        let userData = '';
        try {
            if (state.email !== "") {
                userData = await signInUser({
                    variables: payload
                });
            }
            if (userData.data.signInUser.token) {
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to home page..'
                }))
                localStorage.setItem(ACCESS_TOKEN_NAME, userData.data.signInUser.token);
                redirectToHome();
                props.showError(null)
            }
        } catch (errors) {
            props.showError(errors.message);
        }
    }
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
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
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