import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MY_PROFILE } from "../Queries/user";
import { withRouter } from "react-router-dom";

function Profile(props) {
    const { data: user, loading } = useQuery(MY_PROFILE);

    if (loading) return "loading";
    return (
        <div className="card col-12 col-lg-12">
            <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Name :</label>
                <span>{ user ? user.me.name : ''}</span>
            </div>
            <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address : </label>
                <span>{ user ? user.me.email : ''}</span>
            </div>
        </div>
    );
}

export default withRouter(Profile);
