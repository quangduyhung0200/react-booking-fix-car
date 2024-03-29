import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { UserContext } from '../../context/userContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { userLogout } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
class Navigate_Guest extends Component {



    render() {
        let user = this.context.user
        const location = window.location.pathname


        if (location !== "/login") {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header h-100">

                        <Navbar.Brand href="/"> <span className='band-nav'>MYCAR</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" exact className='nav-link'>Trang chủ</NavLink>
                                <NavDropdown title="Tìm kiếm" id="basic-nav-dropdown">
                                    <NavLink to="/allGara" exact className='nav-link'>Tìm gara</NavLink>
                                    <NavLink to="/allHandBook" exact className='nav-link'>Tìm bài viết</NavLink>


                                </NavDropdown>




                            </Nav>
                            <> <Link className='nav-link' to='/login'>Đăng nhập</Link></>


                        </Navbar.Collapse>

                    </Navbar>

                </div >




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
Navigate_Guest.contextType = UserContext


export default withRouter(Navigate_Guest);
