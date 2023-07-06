import React from "react";
import './nav.scss'
import {

    Link, NavLink
} from "react-router-dom";
import listUser from "../user/listUser";
class Nav extends React.Component {

    render() {
        console.log("checkdhasjdhasljhflaksf", this.props)
        return (
            <div class="topnav">
                <NavLink to="/" activeClassName="active"> Home</NavLink>
                <NavLink to="/todo" activeClassName="active"> todo</NavLink>
                <NavLink to="/about" activeClassName="active"> about</NavLink>
                <NavLink to="/user" activeClassName="active"> user</NavLink>

                {/* <Link class="active" to="/">Home</Link>
                <Link to="/todo">todo</Link>
                <Link to="/about">about</Link> */}

                {/* <a class="active" href="/">Home</a>
                <a href="/todo">todo</a>
                <a href="/about">job</a> */}

            </div>
        )
    }

}
export default Nav