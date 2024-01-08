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
class NavigateGara extends Component {


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


        if (user && user.isAuthenticated === true && user.account.role[0].id === 2) {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header h-100">
                        <Container>
                            <Navbar.Brand href="/"> <span className='band-nav'>MyCar</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Trang chủ</NavLink>

                                    <NavLink to="/myOrder" exact className='nav-link'>Đơn hàng của tôi</NavLink>

                                    <NavLink to="/allGara" exact className='nav-link'>Gara</NavLink>
                                    <NavLink to="/allHandBook" exact className='nav-link'>HandBook</NavLink>
                                    <NavLink to="/Chart" exact className='nav-link'>Quản lý bieu do</NavLink>
                                </Nav>

                                <Nav className='nav-link'>
                                    <Nav.Item  >Wellcome  {user.account.userName}</Nav.Item>

                                </Nav>
                                <NavDropdown title="Quản lý gara" id="basic-nav-dropdown">


                                    <NavLink to="/mygara" exact className='nav-link'>Gara của tôi</NavLink>
                                    <NavLink to="/pickcar" exact className='nav-link'>Quản lý chọn xe</NavLink>
                                    <NavLink to="/setSchedule" exact className='nav-link'>Quản lý lịch sửa</NavLink>
                                    <NavLink to="/manageBooking" exact className='nav-link'>Quản lý đơn đặt lịch</NavLink>
                                    <NavLink to="/manageOrder" exact className='nav-link'>Quản lý đơn hàng</NavLink>


                                </NavDropdown>
                                <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">
                                    <Link className='nav-link' to="/Account">Trang cá nhân</Link>


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
NavigateGara.contextType = UserContext


export default withRouter(NavigateGara);
