
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

import React, { Component } from 'react';
class PrivateRole extends Component {

    render() {

        if (this.context.user && this.context.user.isAuthenticated === true) {

            return (
                <>
                    <Switch>
                        <Route path={this.props.path} component={this.props.component} />

                    </Switch>

                </>
            )
        }
        else {

            return (
                <>
                    <Redirect to="/login"></Redirect>

                </>
            )
        }
    }
}
PrivateRole.contextType = UserContext
export default PrivateRole