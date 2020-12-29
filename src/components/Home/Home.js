import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Profile from "../../USER/Profile"
function Home(props) {
    return(
        <div>
           <Profile />
        </div>
    )
}

export default withRouter(Home);