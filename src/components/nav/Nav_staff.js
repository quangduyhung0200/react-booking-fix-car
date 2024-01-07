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
class NavigateStaff extends Component {


    handLogout = async () => {
        let data = await userLogout()

        this.context.logout()
        if (data && data.EC === 0) {
            localStorage.setItem('jwt', '')
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


        if (user && user.isAuthenticated === true && user.account.role[0].id === 3) {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header h-100">
                        <Container>
                            <Navbar.Brand href="/"> <span className='band-nav'>MyCar</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">


                                    <NavLink to="/" exact className='nav-link'>Trang chủ</NavLink>
                                    <NavLink to="/allGara" exact className='nav-link'>Gara</NavLink>
                                    <NavLink to="/allHandBook" exact className='nav-link'>HandBook</NavLink>



                                    <NavLink to="/myOrder" exact className='nav-link'>Đơn đặt lịch của tôi</NavLink>
                                </Nav>
                                <NavDropdown title="Quản lý gara" id="basic-nav-dropdown">
                                    <NavLink to="/ManageGara" exact className='nav-link'>Quản lý gara</NavLink>
                                    <NavLink to="/setSchedule" exact className='nav-link'>Quản lý lịch của gara</NavLink>
                                    <NavLink to="/manage-PickCar" exact className='nav-link'>Quản lý chọn xe cho gara</NavLink>

                                </NavDropdown>
                                <NavDropdown title="Quản lý bài đăng" id="basic-nav-dropdown">
                                    <NavLink to="/manageHandBook" exact className='nav-link'>Quản lý bài đăng</NavLink>



                                </NavDropdown>
                                <NavDropdown title="Quản lý người dùng" id="basic-nav-dropdown">
                                    <NavLink to="/user" exact className='nav-link'>Quản lý người dùng</NavLink>



                                </NavDropdown>
                                <Nav className='nav-link'>
                                    <Nav.Item  >Wellcome  {user.account.userName}</Nav.Item>

                                </Nav>
                                <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">
                                    <NavLink to="/Account" exact className='nav-link'>Tài khoản</NavLink>



                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <span onClick={() => this.handLogout()}> Log out</span>

                                    </NavDropdown.Item>
                                </NavDropdown>


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
NavigateStaff.contextType = UserContext


export default withRouter(NavigateStaff);
