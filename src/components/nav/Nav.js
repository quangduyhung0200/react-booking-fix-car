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
class Navigate extends Component {


    handLogout = async () => {
        let data = await userLogout()

        this.context.logout()
        if (data && data.EC === 0) {
            this.props.history.push('/login')
            toast.success('log out success')

        }
        else {
            toast.error(data.EM)
        }
    }

    render() {
        let user = this.context.user
        const location = window.location.pathname
        console.log('this. user: ', user)

        if (user && user.isAuthenticated === true || location === "/") {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header h-100">
                        <Container>
                            <Navbar.Brand href="/"> <span className='band-nav'>React</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    {user && user.isAuthenticated === true && <>
                                        <NavLink to="/myOrder" exact className='nav-link'>My order</NavLink>

                                    </>}


                                </Nav>
                                {user && user.isAuthenticated === true ? <>
                                    <Nav className='nav-link'>
                                        <Nav.Item  >Wellcome  {user.account.userName}</Nav.Item>

                                    </Nav>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">

                                        <Link className='nav-link' to="/RegisterGara">RegisterGara</Link>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <span onClick={() => this.handLogout()}> Log out</span>

                                        </NavDropdown.Item>
                                    </NavDropdown></> : <> <Link className='nav-link' to='/login'>Login</Link></>}


                            </Navbar.Collapse>
                        </Container>
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
Navigate.contextType = UserContext


export default withRouter(Navigate);
