import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if (props.location.pathname === '/home' || props.location.pathname === '/Listbook' || props.location.pathname === '/Createbook' || props.location.pathname === '/Editbook') {
            return (
                <div className="ml-auto">
                    <button className="btn btn-danger pull left" onClick={() => handleLogout()}>Logout</button>
                    <button className="btn btn-info pull left" onClick={() => props.history.push('/Listbook')}>List Book</button>
                    <button className="btn btn-info pull left" onClick={() => props.history.push('/home')}>Profile</button>
                    <button className="btn btn-info pull left" onClick={() => props.history.push('/Createbook')}>Add Book</button>
                </div>
            )
        }
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);