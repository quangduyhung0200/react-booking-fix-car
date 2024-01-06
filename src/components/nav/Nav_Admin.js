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
class NavigateAdmim extends Component {


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


        if (user && user.isAuthenticated === true && user.account.role[0].id === 4) {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="  bg-body-tertiary bg-header h-100">
                        <Container>
                            <Navbar.Brand href="/"> <span className='band-nav'>React</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <NavLink to="/" exact className='nav-link'>Trang chủ</NavLink>
                                </Nav>
                                <NavDropdown title="Quản lý người dùng" id="basic-nav-dropdown">
                                    <NavLink to="/user" exact className='nav-link'>Quản lý người dùng</NavLink>
                                    <NavLink to="/manage-comment" exact className='nav-link'>Quản lý comment người dùng</NavLink>

                                </NavDropdown>
                                <NavDropdown title="Quản lý gara" id="basic-nav-dropdown">
                                    <NavLink to="/ManageGarahasntPass" exact className='nav-link'>Quản lý gara chưa được phê duyệt</NavLink>
                                    <NavLink to="/ManageGara" exact className='nav-link'>Quản lý gara đang hoạt động</NavLink>
                                    <NavLink to="/manage-PickCar" exact className='nav-link'>Quản lý chọn xe cho gara</NavLink>
                                    <NavLink to="/setSchedule" exact className='nav-link'>Quản lý đặt lịch sửa xe cho gara</NavLink>


                                </NavDropdown>
                                <NavDropdown title="Quản lý xe" id="basic-nav-dropdown">
                                    <NavLink to="/car" exact className='nav-link'>Quản lý xe</NavLink>
                                    <NavLink to="/manage-carCompany" exact className='nav-link'>Quản lý công ty xe</NavLink>


                                </NavDropdown>
                                <NavDropdown title="Quản lý đơn hàng" id="basic-nav-dropdown">
                                    <NavLink to="/manage-booking" exact className='nav-link'>Quản lý đơn đặt lịch</NavLink>

                                </NavDropdown>
                                <NavDropdown title="Quản lý cẩm nang" id="basic-nav-dropdown">

                                    <NavLink to="/manage-handBookuncensorship" exact className='nav-link'>Quản lý cẩm nang chưa phê duyệt</NavLink>
                                    <NavLink to="/manage-handBook" exact className='nav-link'>Quản lý cẩm nang</NavLink>

                                </NavDropdown>
                                <Nav className='nav-link'>
                                    <Nav.Item  >Wellcome  {user.account.userName}</Nav.Item>

                                </Nav>
                                <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/Account">Quản lý tài khoản</NavDropdown.Item>


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
NavigateAdmim.contextType = UserContext


export default withRouter(NavigateAdmim);
