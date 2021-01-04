import React, { useState, useEffect } from 'react';
import { Redirect, Route, withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';
import jwtDecode from 'jwt-decode';
const PrivateRoute = ({ children, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  useEffect(() => {
    // const auth = useSelector(state => state.auth)
    let token = localStorage.getItem(ACCESS_TOKEN_NAME)
    if (token) {
      let tokenExpiration = jwtDecode(token).exp;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    } else {
      setIsAuthenticated(false)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])
  if (isAuthenticated !== null && !isAuthenticated) {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
    rest.history.push('/login')
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem(ACCESS_TOKEN_NAME) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default withRouter(PrivateRoute);